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
    product.updatePricies(
        'test',
        'http://preisexporte.apobyte.de/www.eurapon.de/preissuchmaschine/preissuchmaschine.csv',
        1,
        '\t'
        )
        .then(()=>{
            res.send('OK');
        });
});

/**
 * View status of operation
 * @return {json} status operation
 * 
 * @example 
 * GET /update/status/id
 */
route.get('/update/status/:id', (req, res) => {

});

module.exports = route;