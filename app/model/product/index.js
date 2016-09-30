'use strict';
var request = require('request');
//var cfgReader = require('yamljs');
var Product = {
    getLastPrice: (shopname, productId) => {
        return new Promise((resolve, reject) => {
            return resolve(1);
        });
    },

    updatePricies: (shopname,url,header,delimeter) =>{
        let line = 0;
        let parsedLine = [];
        let chunkedLine = [];
        return new Promise((resolve,reject)=>{
            request
                .get(url)
                .on('error',err=>{
                    return reject(err);
                })
                .on('data',(chunk)=>{
                    let data = chunk.toString().split('\r\n');
                    let withChunckLine = 1;
                    if(chunkedLine.length){
                        data[0]=chunkedLine.pop()+data[0];
                    }
                    if(chunk[chunk.length]!='\r' ||chunk[chunk.length]!='\n') {
                        withChunckLine = 2;
                        chunkedLine.push(data[data.length-1]);
                    }
                    let start = line==0?header:0;
                    let validLine = data.slice(start,start + data.length - withChunckLine);
                    validLine.forEach((item)=>{
                        parsedLine.push(item.split(delimeter));
                    });
                    line+=parsedLine.length;
                    console.log('Parsed lines: ',shopname,line);
                })
                .on('end',()=>{
                    return resolve(parsedLine.length);
                });
        });
    }
};

module.exports = Product;