const passport = require('passport');
require('../authentication');

module.exports = (app) => {
    const order = require('../controllers/order.controller');
    
    app.get('/api/userOrders/:userId', passport.authenticate('jwt', {session: false}), order.getUserOrders);

    app.post('/api/order', passport.authenticate('jwt', {session: false}), order.createOrder);

    app.put('/api/order', passport.authenticate('jwt', {session: false}), order.updateOrder);

    app.delete('/api/order/:orderId', passport.authenticate('jwt', {session: false}), order.deleteOrder);

}