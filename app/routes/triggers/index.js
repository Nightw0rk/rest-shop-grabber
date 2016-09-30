var route = require('express').Router();
var product = require('../../model/product');

/**
 * Trigger for update data
 * @return {number} id operation
 * 
 * @example 
 * POST /update
 * 
 */
route.post('/update', (req, res) => {
    require('async').map(
        req.app.config.shops,
        (item, cb) => {
            var shop = Object.keys(item)[0];
            console.log("Start parsing " + shop);
            product.updatePricies(req.app.redis, shop, item[shop].url, item[shop].config)
                .then(() => {
                    return cb(null);
                })
                .catch(cb);

        },
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    status: "ERROR",
                    err: err
                })
            }
            return res.send({ status: "OK" });
        }
    );
});

module.exports = route;