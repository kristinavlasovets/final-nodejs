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
		const reviews = await ReviewModel.find().populate(['author', 'artPiece']);

		return reviews;
	}

	async getOne(id) {
		const review = await ReviewModel.findOne({_id: id}).populate([
			'author',
			'artPiece',
		]);

		return review;
	}
	async getByTag(tag) {
		const reviews = await ReviewModel.find({tags: {$in: tag}}).limit(20);

		return reviews;
	}

	async likeReview(id, reviewId) {
		const candidateLike = await ReviewModel.find({likes: {$in: id}});

		if (candidateLike) {
			await ReviewModel.findByIdAndUpdate(reviewId, {
				$pull: {likes: id},
			});
		} else
			await ReviewModel.findByIdAndUpdate(reviewId, {$addToSet: {likes: id}});
	}
}

module.exports = new ReviewService();
