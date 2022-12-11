const ArtPieceModel = require('../models/artPiece-model');

class ArtPieceService {
	async create(name, stars) {
		const artPiece = await ArtPieceModel.create({
			name,
			stars,
		});

		return artPiece;
	}
}

module.exports = new ArtPieceService();
