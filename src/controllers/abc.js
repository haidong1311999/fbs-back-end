const product = require('../model/ProductModel');
const cate = require('../model/CateModel');
const User = require('../model/UserModel');
const Orders = require('../model/OrderModel');
const OrdersDetails = require('../model/OrderDetailsModel');
var express = require('express');
var router = express.Router();
const session = require('express-session');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const uuid = require('uuid');


exports.getAllProduct = function (request, response) {
    product.find({
        delete_at: null
    }, (err, data) => {
        product.aggregate([
            {
                $lookup: {
                    from: 'cates',
                    localField: 'cateId',
                    foreignField: 'cateId',
                    as: 'cate'
                }
            }
        ], (err, res) => {
            if (err) throw err;
            response.render('index', {productList: res.reverse()});
        });
    })
};

exports.getProduct = function (request, response) {
    product.findById(request.params.id)
        .lean()
        .exec((err, data) => {
            if (!err) {
                cate.find().lean().exec((err, cates) => {
                    if (err) throw err;
                    if (err) throw err;
                    response.render('edit_product', {product: data, cates: cates.reverse()});

                })


            }
        });
};

exports.getAllCate = function (req, res) {

    cate.find().lean().exec((err, data) => {
        if (err) throw err;

        res.render('list_cate', {cateList: data.reverse()});
    })

};
exports.getAllUser = function (req, res) {

    User.find().lean().exec((err, data) => {
        if (err) throw err;
        res.render('list_users', {userList: data.reverse()});
    })

};
exports.getAllGift = function (req, res) {

    gift.find().lean().exec((err, data) => {
        if (err) throw err;
        res.render('list_gift', {giftList: data.reverse()});

    })

};
exports.addGift = (req, res) => {

}
exports.deleteGift = function (request, response) {
    gift.deleteOne({_id: request.params.id}, (err, doc) => {
        if (!err) {
            response.redirect('/list_gift');
        } else {
            console.log(err);
        }
    });
};
exports.addProduct = function (req, res) {

    cate.find().lean().exec((err, data) => {
        if (err) throw err;

        res.render('add_product', {cateList: data.reverse()});
    })

};
exports.deleteProduct = function (request, response) {
    product.deleteOne({_id: request.params.id}, (err, doc) => {
        if (!err) {
            response.redirect('/index');
        } else {
            console.log(err);
        }
    });
};
exports.deleteCate = function (request, response) {
    cate.deleteOne({_id: request.params.id}, (err, doc) => {
        if (!err) {
            response.redirect('/list_cate');
        } else {
            console.log(err);
        }
    });
};
exports.getCate = function (request, response) {
    cate.findById(request.params.id)
        .lean()
        .exec((err, data) => {
            if (!err) {
                if (err) throw err;
                response.render('edit_cate', {cate: data});
            }
        });
};
exports.getAllOrders = (req, res1) => {
    Orders.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: 'userId',
                as: 'user'
            }
        }
    ], (err, res) => {
        if (err) throw err;
        res1.render('list_order', {orderList: res.reverse()});
    });


};
exports.getOrderDetails = async (req, res1) => {
    OrdersDetails.find({idOrder: req.params.id}, (err, data) => {
        OrdersDetails.aggregate([
            {"$match": {"idOrder": req.params.id}},
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: 'productId',
                    as: 'product'
                }
            },

        ], (err, res) => {
            if (err) throw err;
            res1.render('list_order_details', {orderDetailsList: res});

        });
    })

};



