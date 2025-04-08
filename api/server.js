const express = require('express');
const cors = require('cors');
require('dotenv').config()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = require('./database');
const authToken = require('./auth')

const staticRoutes = require('./staticRoute');
staticRoutes(app);

//LOGIN API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT id, email, password, role FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (match) {

                const token = jwt.sign({ id: user.id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict"
                });

                res.json({ message: "Login successful", token });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        });
    });
})

//REGISTER API 
app.post('/api/register', (req, res) => {
    const { first_name, last_name, email, password, passport_number } = req.body;
    const role = 'customer';
    console.log(first_name, last_name, email, password, passport_number)

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        console.log(hashedPassword)
        if (err) {
            console.log('Error hashing password:', err);
            return res.status(500).send({ error: 'Error hashing password' });
        }

        db.query("INSERT INTO Users (first_name, last_name, email, password, role, passport_number) VALUES (?, ?, ?, ?, ?, ?)", [first_name, last_name, email, hashedPassword, role, passport_number], (err, results) => {
            if (err) {
                return res.status(500).send({ error: 'Failed to register user' });
            }

            res.json({
                message: "User registered successfully",
            });
        });
    })

})

//AIRPORT API
app.get('/airports', (req, res) => {
    db.query('SELECT name, iata_code FROM Airports', (err, results) => {
        if (err) return res.status(500).send(err);
        console.log(results)
        res.json(results);
    })
})

//FLIGHT API
app.get('/flights', (req, res) => {
    db.query(`SELECT flight_code, departure_airport, arrival_airport,
            departure_time, arrival_time, price, available_seats
            FROM Flights`,
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results)
        })
})

//SEATS API ไว้หาที่นั่งที่ยังว่าง
app.get('/seats', (req, res) => {
    db.query('SELECT seat_number, seat_class, is_booked FROM Seats', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results)
    })
});

//SEARCH API 
app.post('/search', (req, res) => {
    const { from, to, departure_date } = req.body;
    const query = `
        SELECT flight_code, departure_airport, arrival_airport,
            departure_time, arrival_time, price
        FROM Flights 
        WHERE departure_airport = ? 
            AND arrival_airport = ? 
            AND DATE(departure_time) = ?`;

    db.query(query, [from, to, departure_date], (err, results) => {
        if (err) return res.status(500).send(err);
        console.log(results);
        res.json(results);
    });
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());
//BOOKING API
app.post('/booking', authToken, async (req, res) => {
    try {
        const { flight_id, seat } = req.body;
        const user_id = req.user.id;

        // เช็คเที่ยวบิน
        const [rows] = await db.promise().query(`SELECT available_seats FROM Flights WHERE id = ?`, [flight_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Flight not found.' });
        }

        const available_seats = rows[0].available_seats;

        // ตรวจว่ามีที่นั่งพอหรือป่าว
        if (available_seats < seat.length) {
            return res.status(400).json({ message: 'Not enough available seats.' });
        }

        // เช็คว่าที่นั่งว่างหรือไม่
        const [seatsStatus] = await db.promise().query(
            `SELECT seat_number, is_booked 
            FROM Seats 
            WHERE seat_number IN (?) AND flight_id = ?`,
            [seat, flight_id]
        );

        const alreadyBookedSeats = seatsStatus.filter(seat => seat.is_booked === 1).map(seat => seat.seat_number);

        if (alreadyBookedSeats.length > 0) {
            return res.status(400).json({ message: `The following seats are already booked: ${alreadyBookedSeats.join(', ')}` });
        }

        // ลดจำนวนที่นั่งเที่ยวบิน
        await db.promise().query(
            `UPDATE Flights SET available_seats = available_seats - ? WHERE id = ?`,
            [seat.length, flight_id]
        );

        // เพิ่มการจอง
        await db.promise().query(
            `INSERT INTO Bookings (user_id, flight_id, number_of_seats, status) VALUES (?, ?, ?, 'PENDING')`,
            [user_id, flight_id, seat.length]
        );

        // อัปเดตสถานะที่นั่งที่ถูกจอง
        await db.promise().query(
            `UPDATE Seats SET is_booked = TRUE WHERE seat_number IN (?) AND flight_id = ?;`,
            [seat, flight_id]
        );

        // ดึงข้อมูลการจองล่าสุด
        const [[booking]] = await db.promise().query(
            `SELECT id FROM Bookings WHERE user_id = ? ORDER BY id DESC LIMIT 1`,
            [user_id]
        );

        // เพิ่มข้อมูลที่นั่งที่จองในตาราง Booking_Seats
        await db.promise().query(
            `INSERT INTO Booking_Seats (booking_id, seat_id) 
            SELECT ?, id 
            FROM Seats 
            WHERE seat_number IN (?) AND flight_id = ?;`,
            [booking.id, seat, flight_id]
        );

        res.status(201).json({ message: 'Booking Success' });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
});

//PAYMENTS API สร้าง payment
app.post('/payments', (req, res) => {
    const { booking_id, amount, payment_method } = req.body;
    db.query(`INSERT INTO Payments (booking_id, amount, payment_method, status)
            VALUES (?, ?, ?, 'PENDING');`,
        [booking_id, amount, payment_method],
        (err, results) => {
            if (err) return res.status(500).send(err)
            res.json({ message: "Add payments success" })
        }
    );

})

//PAYMENTS CONFIRMED API ใช้เมื่อจ่ายสำเร็จ
app.post('/payments-confirmed', (req, res) => {
    const { booking_id } = req.body;
    db.query(`UPDATE Payments
            SET status = 'COMPLETED'
            WHERE booking_id = ?`,
        [booking_id],
        (err, results) => {
            if (err) return res.status(500).send(err)
        }
    );

    db.query(`UPDATE Bookings
            SET status = 'CONFIRMED'
            WHERE id = ?`,
        [booking_id],
        (err, results) => {
            if (err) return res.status(500).send(err)
        }
    );

    res.json({ message: "payments successfully" })
})

//EDIT PROFILES


//ADMIN API

//INSERT FLIGHT
app.post('/add-flight', (req, res) => {
    const { flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price } = req.body;
    db.query(`INSERT INTO Flights (flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, available_seats)
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, 20],
        (err, results) => {
            if (err) return res.status(500).send(err)
            console.log(results);
            res.json(results)
        })
})

app.get('/flights/:flightCode', (req, res) => {
    const { flightCode } = req.params;
    db.query('SELECT flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, available_seats FROM Flights WHERE flight_code = ?', [flightCode], (err, results) => {
        if (err) return res.status(500).send(err)
        console.log(results);
        res.json(results)
    });
});

app.delete('/flights/:flight_code', (req, res) => {
    const { flight_code } = req.params;
    db.query('DELETE FROM Flights WHERE flight_code = ?',
        [flight_code],
        (err, results) => {
            if (err) return res.status(500).send(err)
            console.log(results);
            res.json(results)
        }
    )
})

app.put('/flights/:flightCode', async (req, res) => {
    const { flightCode } = req.params;
    const { flight_code, departure_time, arrival_time, price } = req.body;

    console.log("hi yt")
    try {
        db.query(
            'UPDATE Flights SET flight_code = ?, departure_time = ?, arrival_time = ?, price = ? WHERE flight_code = ?',
            [flight_code, departure_time, arrival_time, price, flightCode],
            (err, results) => {
                if (err) return res.status(500).send(err)
                console.log(results);
                res.status(200).json({ message: 'Flight updated' });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update flight');
    }
});