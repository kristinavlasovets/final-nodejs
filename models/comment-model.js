const {Schema, model, default: mongoose} = require('mongoose');

const CommentSchema = new Schema({
	name: {type: String, required: false},
	userId: {type: String, required: true},
	reviewId: {type: String, required: true},
	desc: {type: String, required: true},
});

module.exports = model('Comment', CommentSchema);
