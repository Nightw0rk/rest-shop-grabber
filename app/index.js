var app = require('express')();

app.use(require('./middleware/store')); // Redis
app.use(require('./routes/shops')); // Shops api
app.use(require('./routes/triggers')); // Shop triggers

module.exports = app;