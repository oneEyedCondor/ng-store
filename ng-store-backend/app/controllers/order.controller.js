const Order = require('../models/order');
const Product = require('../models/product');

exports.getUserOrders = async (req, res) => {
    try {
        const userOrders = await Order.findAll({
            where: {
                userId: req.params['userId']
            },
            include: {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'manufacturer']
            }
        });
        res.status(200).send(userOrders);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.createOrder = async (req, res) => {
    try {
        const orders = req.body.map(o => ({
            productId: o.id,
            productPrice: o.price,
            productCount: o.count,
            userId: req.user.id
        }));

        const userOrders = await Promise.all(
            orders.map(async (o) => {
                const order = await Order.create({ ...o });
                const { id, name, manufacturer } = await order.getProduct();
                order.setDataValue('product', { id, name, manufacturer });
                return order;
            })
        );
        res.status(200).send(userOrders);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.updateOrder = async (req, res) => {
    try {
        await Order.update({ ...req.body }, {
            where: {
                id: req.body.id
            }
        });
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await Order.destroy({
            where: {
                id: req.params['orderId']
            }
        });
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err);
    }
};