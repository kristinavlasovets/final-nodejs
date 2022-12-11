const ReviewModel = require('../models/review-model');

class ReviewService {
	async create(
		title,
		artPiece,
		group,
		tags,
		text,
		image,
		author,
		grade,
		likes
	) {
		const review = await ReviewModel.create({
			title,
			artPiece,
			group,
			tags,
			text,
			image,
			author,
			grade,
			likes,
		});

		return review;
	}

	async getAll() {
		const reviews = await ReviewModel.find().populate('author');

		return reviews;
	}
}

module.exports = new ReviewService();
