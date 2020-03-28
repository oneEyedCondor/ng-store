const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).send(products);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params['productId']);
        res.status(200).send(product);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create({ ...req.body });
        res.status(200).send(product);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        await Product.update({ ...req.body }, {
            where: {
                id: req.body.id
            }
        });
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params['productId']
            }
        });
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err);
    }
};