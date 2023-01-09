const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
	{
		googleId: {
			type: String,
			required: false,
		},
		gitHubId: {
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: false,
		},
		email: {type: String, unique: true},
		password: {type: String, required: false},
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
