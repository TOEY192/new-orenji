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
    //console.log(first_name, last_name, email, password, role, passport_number)

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        //console.log(hashedPassword)
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

app.get('/user/:user_id', (req, res) => {
    const { user_id } = req.params;

})

//AIRPORT API
app.get('/airports', (req, res) => {
    db.query('SELECT name, iata_code FROM Airports', (err, results) => {
        if (err) return res.status(500).send(err);
        //console.log(results)
        res.json(results);
    })
})

//FLIGHT API
app.get('/flights', (req, res) => {
    db.query(`SELECT flight_code, departure_airport, arrival_airport,
            departure_time, arrival_time, price, available_seats, class
            FROM Flights`,
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results)
        })
})

//SEATS API ไว้หาที่นั่งที่ยังว่าง
app.get('/seats/:flight_id', (req, res) => {
    const { flight_id } = req.params
    db.query('SELECT seat_number, seat_class, is_booked FROM Seats WHERE flight_id = ?', [flight_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results)
    })
});

//SEARCH API 
app.get('/search', (req, res) => {
    const { from, to, departure_date } = req.query;
    //console.log(from, to, departure_date)
    const query = `
        SELECT flight_code, departure_airport, arrival_airport,
            departure_time, arrival_time, price, class
        FROM Flights 
        WHERE departure_airport = ? 
            AND arrival_airport = ? 
            AND DATE(departure_time) = ?`;

    db.query(query, [from, to, departure_date], (err, results) => {
        if (err) return res.status(500).send(err);
        //console.log(results);
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
        //console.log(booking.id)
        return res.status(201).json({ booking: booking.id });
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
            return res.status(200).json({ message: "Add payments success" })
        }
    );

})

//PAYMENTS CONFIRMED API ใช้เมื่อจ่ายสำเร็จ
app.get('/payments-confirmed/:booking_id', (req, res) => {
    const { booking_id } = req.params;
    db.query(`SELECT status FROM Payments WHERE booking_id = ?`,
        [booking_id],
        (err, results) => {
            if (err) return res.status(500).send(err)
            res.json(results)
        }
    );
})

app.post('/payments-confirmed/:booking_id', (req, res) => {
    const { booking_id } = req.params;
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

app.get('/payments-redirect/:booking_id', (req, res) => {
    const bookingId = req.params.booking_id;
    res.send(`
        <html>
        <body>
            <script>
                fetch('/payments-confirmed/${bookingId}', { method: 'POST' })
                    .then(res => res.json())
                    .then(data => {
                        alert('Payment Successful!');
                        window.close();
                    })
                    .catch(() => {
                        alert('Payment Failed');
                    });
            </script>
        </body>
        </html>
    `);
});


//EDIT PROFILES


//ADMIN API

//INSERT FLIGHT
app.post('/add-flight', (req, res) => {
    const { flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, aclass } = req.body;
    db.query(`INSERT INTO Flights (flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, available_seats, class)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, 20, aclass],
        (err, _results) => {
            if (err) res.status(500).send(err);
        })

    db.query('SELECT id FROM Flights ORDER BY id DESC LIMIT 1', (err, results) => {
        if (err) res.status(500).send(err);
        console.log(results)
        return res.json({ results, aclass });
    })
})

app.get('/flights/:flightCode', (req, res) => {
    const { flightCode } = req.params;
    db.query('SELECT id, flight_code, departure_airport, arrival_airport, departure_time, arrival_time, price, available_seats FROM Flights WHERE flight_code = ?', [flightCode], (err, results) => {
        if (err) return res.status(500).send(err)
        //console.log(results);
        res.json(results)
    });
});

app.delete('/flights/:flight_code', (req, res) => {
    const { flight_code } = req.params;
    db.query('DELETE FROM Flights WHERE flight_code = ?',
        [flight_code],
        (err, results) => {
            if (err) return res.status(500).send(err)
            //console.log(results);
            res.json(results)
        }
    )
})

app.put('/flights/:flightCode', async (req, res) => {
    const { flightCode } = req.params;
    const { flight_code, departure_time, arrival_time, price } = req.body;

    try {
        db.query(
            'UPDATE Flights SET flight_code = ?, departure_time = ?, arrival_time = ?, price = ? WHERE flight_code = ?',
            [flight_code, departure_time, arrival_time, price, flightCode],
            (err, results) => {
                if (err) return res.status(500).send(err)
                //console.log(results);
                res.status(200).json({ message: 'Flight updated' });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update flight');
    }
});


app.post('/generate-seats/:flight_id/:aclass', (req, res) => {
    const { flight_id, aclass } = req.params;

    const rows = ['A', 'B'];
    const cols = 10;
    const seats = [];

    for (let r = 0; r < rows.length; r++) {
        for (let c = 1; c <= cols; c++) {
            let seatClass = aclass;
            seats.push([flight_id, `${rows[r]}${c}`, seatClass, false]);
        }
    }

    const sql = `INSERT INTO Seats (flight_id, seat_number, seat_class, is_booked) VALUES ?`;
    db.query(sql, [seats], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Seats generated successfully', inserted: results.affectedRows });
    });
});

app.get('/ticket/:user_id', (req, res) => {
    const { user_id } = req.params;
    const sql = `SELECT 
                f.flight_code, 
                f.departure_time, 
                f.arrival_time, 
                s.seat_number, 
                s.seat_class, 
                f.price AS payment_amount,  
                p.payment_method, 
                p.status AS payment_status, 
                u.first_name, 
                u.last_name, 
                u.passport_number 
                FROM Bookings b
                JOIN Flights f ON b.flight_id = f.id
                JOIN Booking_Seats bs ON b.id = bs.booking_id
                JOIN Seats s ON bs.seat_id = s.id
                JOIN Payments p ON b.id = p.booking_id
                JOIN Users u ON b.user_id = u.id
                WHERE u.id = ?;
                `

    db.query(sql, [user_id], (err, results) => {
        if(err) res.status(500).send(err)
        res.status(200).json(results)
    })
})