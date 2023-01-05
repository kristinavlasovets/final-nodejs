const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
	{
		// fromGoogle: {type: Boolean, default: false},
		email: {type: String, unique: true, required: true},
		password: {type: String, required: true},
		status: {type: String, default: 'active'},
		role: {type: String, default: 'user'},
		createdReviews: [{type: Schema.Types.ObjectId, ref: 'Review', default: []}],
		likedReviews: [{type: Schema.Types.ObjectId, ref: 'Review', default: []}],
		ratedArtPieces: [
			{type: Schema.Types.ObjectId, ref: 'ArtPiece', default: []},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = model('User', UserSchema);
