const passport = require('passport');
require('../authentication');

module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');

    app.post('/api/signIn', passport.authenticate('local'), auth.signIn);
    
    app.post('/api/signUp', auth.signUp);
}