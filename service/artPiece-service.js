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

	async getExactArtPiece(artPieceId) {
		const artPiece = await ArtPieceModel.findById({_id: artPieceId});
		return artPiece;
	}

	async rateArtPiece(star, artPieceId, userId) {
		const rateArtPiece = await ArtPieceModel.findByIdAndUpdate(
			{_id: artPieceId},
			{
				$push: {
					ratings: {
						star: star,
						postedBy: userId,
					},
				},
			},
			{new: true}
		);
		return rateArtPiece;
	}

	async updateRating(star, alreadyRated) {
		const updateRating = await ArtPieceModel.updateOne(
			{ratings: {$elemMatch: alreadyRated}},
			{$set: {'ratings.$.star': star}},
			{new: true}
		);
		return updateRating;
	}

	async getAllRatings(artPieceId) {
		const allRatings = await ArtPieceModel.findById({_id: artPieceId});
		return allRatings;
	}

	async getTotalRating(artPieceId, actualRating) {
		const allTotalRating = await ArtPieceModel.findByIdAndUpdate(
			{_id: artPieceId},
			{
				totalRating: actualRating,
			},
			{new: true}
		);
		return allTotalRating;
	}
}

module.exports = new ArtPieceService();
