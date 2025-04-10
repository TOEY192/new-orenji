const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;

function registerStaticRoutes(app) {
    app.use(express.static(path.join(__dirname, '../page')));
    app.use(express.static(path.join(__dirname, '../js')));
    app.use('/styles', express.static(path.join(__dirname, '../styles')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../page/index.html'));
    });

    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../page/login.html'));
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = registerStaticRoutes;
