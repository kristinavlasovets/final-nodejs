const artPieceService = require('../service/artPiece-service');

class ArtPieceController {
	async create(req, res) {
		try {
			const {name, stars} = req.body;

			const artPiece = await artPieceService.create(name, stars);

			return res.json(artPiece);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Art piece creation error',
			});
		}
	}
}

module.exports = new ArtPieceController();
