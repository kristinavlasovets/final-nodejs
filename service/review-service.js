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
	async getReviewsByUser(userId) {
		const byUserReviews = await ReviewModel.find({
			author: {$in: userId},
		}).populate(['author', 'artPiece']);

		return byUserReviews;
	}

	async getReviewsbyArtPiece(artPieceId) {
		const byArtPieceReviews = await ReviewModel.find({
			artPiece: {$in: artPieceId},
		}).populate(['author', 'artPiece']);

		return byArtPieceReviews;
	}

	async getReviewsBySearch(query) {
		const reviews = await ReviewModel.aggregate([
			{
				$search: {
					index: 'default',
					text: {
						query,
						path: ['title', 'text'],
					},
				},
			},
		]);
		return reviews;
	}

	async getOne(id) {
		const review = await ReviewModel.findOne({_id: id}).populate([
			'author',
			'artPiece',
		]);

		return review;
	}

	async deleteOne(id) {
		const review = await ReviewModel.findOneAndDelete({_id: id}).populate([
			'author',
			'artPiece',
		]);
	}

	async updateOne(
		id,
		title,
		artPiece,
		artGroup,
		tags,
		text,
		image,
		author,
		grade
	) {
		const editedReview = await ReviewModel.updateOne(
			{_id: id},
			{
				title,
				artPiece,
				artGroup,
				tags,
				text,
				image,
				author,
				grade,
			},
			{
				returnDocument: 'after',
			}
		);
		if (!editedReview) {
			throw ApiError.BadRequest('Edit review error');
		}
		return editedReview;
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
