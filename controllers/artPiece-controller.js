const artPieceModel = require('../models/artPiece-model');
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

	async createRating(req, res) {
		const {star, artPieceId, userId} = req.body;
		try {
			const artPiece = await artPieceService.getExactArtPiece(artPieceId);

			let alreadyRated = artPiece.ratings.find(
				(currUserId) => currUserId.toString() === userId.toString()
			);
			if (alreadyRated) {
				const updateRating = await artPieceService.updateRating(
					star,
					alreadyRated
				);
			} else {
				const rateArtPiece = await artPieceService.rateArtPiece(
					star,
					artPieceId,
					userId
				);
			}

			const allRatings = await artPieceService.getAllRatings(artPieceId);

			let totalRating = allRatings.ratings.length;
			let ratingSum = allRatings.ratings
				.map((item) => item.star)
				.reduce((prev, curr) => prev + curr, 0);
			let actualRating = (ratingSum / totalRating).toFixed(1);

			let allRatedArtPiece = await artPieceService.getTotalRating(
				artPieceId,
				actualRating
			);

			res.json(allRatedArtPiece);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get the exact art piece error',
			});
		}
	}
}

module.exports = new ArtPieceController();
