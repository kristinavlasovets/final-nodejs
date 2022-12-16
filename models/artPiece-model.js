const {Schema, model} = require('mongoose');

const ArtPieceSchema = new Schema({
	name: {type: String, required: true},
	// stars: {type: Schema.Types.ObjectId, ref: 'Stars', default: 0},
	stars: {type: Number, required: true, default: 0},
});

module.exports = model('ArtPiece', ArtPieceSchema);