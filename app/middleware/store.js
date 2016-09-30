var cfgReader = require('yamljs');
/**
 * Add connection to request and config
 * 
 */
module.exports = (req, res, next) => {
    var config = cfgReader.load('config.yml');
    var client = require('redis').createClient({
        host: config.service.redis.host,
        port: config.service.redis.port
    });
    req.app = {
        redis: client,
        config: config
    }
    next();
}