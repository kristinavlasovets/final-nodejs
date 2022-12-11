const {Schema, model} = require('mongoose');

const StarsSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	artPiece: {type: Schema.Types.ObjectId, ref: 'ArtPiece', required: true},
	value: {type: Number, default: 0},
});

module.exports = model('Stars', StarsSchema);
