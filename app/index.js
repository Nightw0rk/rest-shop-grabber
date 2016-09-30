var app = require('express')();

app.use(require('./routes/shops'));
app.use(require('./routes/triggers'));

module.exports = app;