const {Schema, model, default: mongoose} = require('mongoose');

const ReviewSchema = new Schema({
	title: {type: String, required: true},
	artPiece: {type: Schema.Types.ObjectId, ref: 'ArtPiece', required: true},
	group: {type: String, required: true},
	tags: {type: Array, default: []},
	text: {type: String, required: true},
	image: {type: String},
	author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	grade: {type: Number, default: 0},
	likes: [String],
});

module.exports = model('Review', ReviewSchema);
