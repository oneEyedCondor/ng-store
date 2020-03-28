const passport = require('passport');
require('../authentication');

module.exports = (app) => {
    const product = require('../controllers/product.controller');
    
    app.get('/api/products', product.getProducts);

    app.get('/api/product/:productId', product.getProduct);

    app.post('/api/product', passport.authenticate('jwt', {session: false}), product.createProduct);

    app.put('/api/product', passport.authenticate('jwt', {session: false}), product.updateProduct);

    app.delete('/api/product/:productId', passport.authenticate('jwt', {session: false}), product.deleteProduct);

}