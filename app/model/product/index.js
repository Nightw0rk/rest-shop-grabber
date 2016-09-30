'use strict';
var request = require('request');
var Product = {
    /**
     * Get last price product
     * 
     * @param {string} shopname Shop name
     * @param {number} productId Product Identification
     * @returns
     */
    getLastPrice: (redisClient, shopname, productId) => {
        return new Promise((resolve, reject) => {
            redisClient.get(shopname + ":" + productId, (err, result) => {
                if (err)
                    return reject(err);
                return resolve(result);
            })
        });
    },

    /**
     * Grab shop product price and store him
     * 
     * @param {string} shopname
     * @param {string} url
     * @param {object} config     
     * @returns
     */
    updatePricies: (redisClient, shopname, url, config) => {
        let line = 0;
        let parsedLine = [];
        let chunkedLine = [];
        let progressId = (new Date()).getTime() + "shopname";
        return new Promise((resolve, reject) => {
            request
                .get(url)
                .on('error', err => {
                    return reject(err);
                })
                .on('data', (chunk) => {
                    if (chunk == null) return
                    let data = chunk.toString().split(config.endline);
                    let withChunckLine = 1;
                    if (chunkedLine.length) {
                        data[0] = chunkedLine.pop() + data[0];
                    }
                    if (chunk[chunk.length] != '\r' || chunk[chunk.length] != '\n') {
                        withChunckLine = 2;
                        chunkedLine.push(data[data.length - 1]);
                    }
                    let start = line == 0 ? config.header : 0;
                    let validLine = data.slice(start, start + data.length - withChunckLine);
                    validLine.forEach((item) => {
                        var data = item.split(String.fromCharCode(config.delimeter))
                        //console.log(shopname + ":" + data[config.columns.id]);
                        redisClient.set(
                            shopname + ":" + data[config.columns.id],
                            data[config.columns.price],
                            () => { }
                        );
                    });
                    line += parsedLine.length;
                })
                .on('end', () => {
                    console.log("End parsing " + shopname);
                    return resolve(true);
                });
        });
    }
};

module.exports = Product;