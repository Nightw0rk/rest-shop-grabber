var cfgReader = require('yamljs');
var app = require('./app');


var config = cfgReader.load('./config.yml');
app.listen(config.service.port, () => {
    console.log('Service srarted at port ' + config.service.port);
});

