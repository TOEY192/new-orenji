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

        console.log(decoded.role)
        if (decoded.role === 'admin') {
            next(); 
        } else {
            return res.status(403).send('Forbidden');
        }
    });
}

module.exports = checkRole;
