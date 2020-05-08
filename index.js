const express = require('express');
const router = require('./routes');
const path = require('path');
const expresLayout = require('express-ejs-layouts');


require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(expresLayout);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));

// Middlewere (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();

    next();
});

app.use('/', router());

app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionando');
});