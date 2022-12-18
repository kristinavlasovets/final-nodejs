const artPieceService = require('../service/artPiece-service');

class ArtPieceController {
	async create(req, res) {
		try {
			const {name} = req.body;

			const artPiece = await artPieceService.create(name);

			return res.json(artPiece);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Art piece creation error',
			});
		}
	}

	async getAll(req, res) {
		try {
			const artPieces = await artPieceService.getAll();

			return res.json(artPieces);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get all the art pieces error',
			});
		}
	}
}

module.exports = new ArtPieceController();
