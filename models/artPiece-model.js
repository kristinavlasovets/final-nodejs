const {Schema, model, default: mongoose} = require('mongoose');

const ArtPieceSchema = new Schema({
	name: {type: String, required: true},
	ratings: [
		{
			star: {
				type: Number,
				default: 0,
			},
			postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		},
	],
	totalRating: {
		type: String,
		default: 0,
	},
});

module.exports = model('ArtPiece', ArtPieceSchema);
