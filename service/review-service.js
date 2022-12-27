const ReviewModel = require('../models/review-model');
const UserModel = require('../models/user-model');

class ReviewService {
	async create(
		title,
		artPiece,
		artGroup,
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
			artGroup,
			tags,
			text,
			image,
			author,
			grade,
			likes,
		});

		await UserModel.updateOne(
			{_id: author},
			{$push: {createdReviews: review._id}}
		);

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
		const candidateLike = await ReviewModel.findOne({
			_id: reviewId,
			likes: {$in: id},
		});

		if (candidateLike) {
			const review = await ReviewModel.findOneAndUpdate(
				{_id: reviewId},
				{
					$pull: {likes: id},
				}
			);

			await UserModel.updateOne({_id: id}, {$pull: {likedReviews: reviewId}});
		} else {
			const review = await ReviewModel.findOneAndUpdate(
				{_id: reviewId},
				{$push: {likes: id}}
			);

			await UserModel.updateOne({_id: id}, {$push: {likedReviews: reviewId}});
		}
	}
}

module.exports = new ReviewService();
