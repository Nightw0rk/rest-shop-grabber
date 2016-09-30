/* global describe*/
/* global it*/
/* global afterEach*/
var test = require('supertest');
var should = require('should');
var sinon = require('sinon');
var app = require('../app');
var product = require('../app/model/product');

describe('Get product price', () => {
    it('Get request is invalid, not sending shopname', (done) => {
        test(app)
            .get('/?product_id=1')
            .expect(400, {
                error: 'Please select shopname'
            }, done);
    });
    it('Get request is invalid, not sending product_id', (done) => {
        test(app)
            .get('/?shopname=testshop')
            .expect(400, {
                error: 'Please select product_id'
            }, done);
    });
    it('Get request is invalid, nothing send', (done) => {
        test(app)
            .get('/')
            .expect(400, {
                error: 'Please select shopname and product_id'
            }, done);
    });

    it('Get product', (done) => {
        sinon.stub(product, 'getLastPrice', (shopname, product_id) => {
            should.exists(shopname);
            shopname.should.equal('testshop');
            should.exists(product_id);
            product_id.should.equal('1');
            return Promise.resolve(1);
        });
        test(app)
            .get('/?shopname=testshop&product_id=1')
            .expect(200, {
                1: 1
            }, done);
    });

    afterEach(() => {
        if (product.getLastPrice.restore)
            product.getLastPrice.restore();
    });
});