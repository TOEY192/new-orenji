const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkRole(req, res, next) {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Forbidden');
        }

        if (decoded.role === 'admin') {
            next(); 
        } else {
            res.redirect('/index.html');
            return res.status(403).send('Forbidden');
        }
    });
}

app.get('/check-role', checkRole, (req, res) => {
    res.send('Welcome to the admin dashboard');
});
