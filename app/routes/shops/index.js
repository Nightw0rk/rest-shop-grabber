'use strict';

var route = require('express').Router();
var product = require('../../model/product');
var cfgReader = require('yamljs');

/**
 * Getting information about product of shop
 * @param {string} shopname Shop name
 * @param {number} product_id Identificate of product for current shop
 * 
 * @return {json} repsent product price 
 * @example 
 * 
 * GET /?shopname=$shopname&product_id=$product_id
 */
route.get('/', (req, res) => {
    let errors = [];
    if (!req.query.shopname) {
        errors.push('shopname');
    }
    if (!req.query.product_id) {
        errors.push('product_id');
    }
    if (errors.length) {
        let strError = errors.join(' and ');
        res.status(400).send({
            error: 'Please select ' + strError
        });
    }
    product.getLastPrice(req.app.redis, req.query.shopname, req.query.product_id)
        .then(price => {
            let response = {};
            response[req.query.product_id] = price;
            res.send(response);
        })
        .catch(err => {
            res.send(err);
        });
});

module.exports = route;