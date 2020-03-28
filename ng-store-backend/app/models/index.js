const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Comment = require('./comment');

User.hasMany(Order, { onDelete: 'cascade' });
Order.belongsTo(User);
Product.hasMany(Order, { onDelete: 'cascade' });
Order.belongsTo(Product);
User.belongsToMany(Product, {through: Order});
Product.belongsToMany(User, {through: Order});

User.hasMany(Comment);
Comment.belongsTo(User);
Product.hasMany(Comment, { onDelete: 'cascade' });
Comment.belongsTo(Product);
// User.belongsToMany(Product, {through: Comment});
// Product.belongsToMany(User, {through: Comment});