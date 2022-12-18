const ArtPieceModel = require('../models/artPiece-model');

class ArtPieceService {
	async create(name) {
		const existedArtPiece = await ArtPieceModel.findOne({name});
		if (existedArtPiece) {
			throw new Error('This art piece is already existed.');
		}

		const artPiece = await ArtPieceModel.create({
			name,
		});

		return artPiece;
	}
	async getAll() {
		const artPieces = await ArtPieceModel.find();

		return artPieces;
	}
}

module.exports = new ArtPieceService();
