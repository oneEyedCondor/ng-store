const jwt = require('jsonwebtoken');
const { secretKey } = require('../authentication');

const User = require('../models/user');

exports.signIn = (req, res) => {
    const user = { id: req.user.id, name: req.user.name, login: req.user.login };
    res.json({ message: 'authenticated', user, token: req.user.token });
};

exports.signUp = async (req, res) => {
    try {
        let user = await User.create(req.body);
        user = { id: user.id, name: user.name, login: user.login };
        const token = jwt.sign({ id: user.id }, secretKey);
        res.json({message: 'registered', user, token });
    } catch(err) {
        res.status(500).send({ message: err });
    }
};