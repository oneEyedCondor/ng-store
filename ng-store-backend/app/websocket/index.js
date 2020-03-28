const http = require('http');
const socketIO = require('socket.io');

const Comment = require('../models/comment');
const User = require('../models/user');

const getCommentsByProductId = async (productId) => {
    return await Comment.findAll({
        where: { productId },
        include: {
            model: User,
            as: 'user',
            attributes: [ 'id', 'name', 'login' ]
        }
    });
};

module.exports = (app) => {
    const server = http.createServer(app);
    const io = socketIO(server);

    io.on('connect', socket => {
        socket.on('get-comments', async (productId) => {
            try {
                const commentsOfProduct = await getCommentsByProductId(productId);
                io.to(socket.id).emit('product-comments', commentsOfProduct);
            } catch(err) {
                io.to(socket.id).emit('error', err);
            }
        });

        socket.on('add-comment', async (comment) => {
            try {
                await Comment.create({ ...comment });
                const commentsOfProduct = await getCommentsByProductId(comment.productId);
                io.emit('product-comments', commentsOfProduct);
            } catch(err) {
                io.to(socket.id).emit('error', err);
            }
        });
    });

    return server;
};