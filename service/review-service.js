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
	async getMostRated() {
		const ratedReviews = await ReviewModel.find()
			.populate(['author', 'artPiece'])
			.sort({grade: -1})
			.limit(10);

		return ratedReviews;
	}
	async getMostRecent() {
		const recentReviews = await ReviewModel.find()
			.populate(['author', 'artPiece'])
			.sort({createdAt: -1})
			.limit(10);

		return recentReviews;
	}
	async getReviewsByTag(tag) {
		const byTagReviews = await ReviewModel.find({tags: {$in: tag}}).populate([
			'author',
			'artPiece',
		]);

		return byTagReviews;
	}

	async getOne(id) {
		const review = await ReviewModel.findOne({_id: id}).populate([
			'author',
			'artPiece',
		]);

		return review;
	}

	async getAllTags(tag) {
		const reviews = await ReviewModel.find().limit(20).exec();

		const tags = reviews.map((obj) => obj.tags).flat();
		const uniqueTags = tags.filter((item, pos) => tags.indexOf(item) == pos);

		return uniqueTags;
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
