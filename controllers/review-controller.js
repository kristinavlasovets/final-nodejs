const reviewModel = require('../models/review-model');
const reviewService = require('../service/review-service');

class ReviewController {
	async create(req, res) {
		try {
			const {title, artPiece, artGroup, tags, text, image, author, grade} =
				req.body;

			const review = await reviewService.create(
				title,
				artPiece,
				artGroup,
				tags,
				text,
				image,
				author,
				grade
			);

			return res.json(review);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Review creation error',
			});
		}
	}

	async getAll(req, res) {
		try {
			const reviews = await reviewService.getAll();

			return res.json(reviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get all the reviews error',
			});
		}
	}

	async getMostRated(req, res) {
		try {
			const mostRatedReviews = await reviewService.getMostRated();

			return res.json(mostRatedReviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get the most rated reviews error',
			});
		}
	}

	async getMostRecent(req, res) {
		try {
			const mostRecentReviews = await reviewService.getMostRecent();

			return res.json(mostRecentReviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get the most recent reviews error',
			});
		}
	}
	async getReviewsbyTag(req, res) {
		try {
			const {tag} = req.params;
			const byTagReviews = await reviewService.getReviewsByTag(tag);

			return res.json(byTagReviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get by tag reviews error',
			});
		}
	}
	async getReviewsbyUser(req, res) {
		try {
			const {userId} = req.params;
			const byUserReviews = await reviewService.getReviewsByUser(userId);

			return res.json(byUserReviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get by user reviews error',
			});
		}
	}
	async getReviewsbyArtPiece(req, res) {
		try {
			const {artPieceId} = req.params;
			const byArtPieceReviews = await reviewService.getReviewsbyArtPiece(
				artPieceId
			);

			return res.json(byArtPieceReviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get by art piece reviews error',
			});
		}
	}

	async getOne(req, res) {
		try {
			const {id} = req.params;
			const review = await reviewService.getOne(id);

			return res.json(review);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get exact review error',
			});
		}
	}
	async deleteOne(req, res) {
		try {
			const {id} = req.params;
			const review = await reviewService.deleteOne(id);

			return res.json(review);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Delete exact review error',
			});
		}
	}
	async updateOne(req, res) {
		try {
			const {id} = req.params;
			const {title, artPiece, artGroup, tags, text, image, author, grade} =
				req.body;
			const editedReview = await reviewService.updateOne(
				id,
				title,
				artPiece,
				artGroup,
				tags,
				text,
				image,
				author,
				grade
			);

			return res.json(editedReview);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Update exact review error',
			});
		}
	}

	async getAllTags(req, res) {
		try {
			const tags = await reviewService.getAllTags();

			return res.json(tags);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get all the tags error',
			});
		}
	}

	async getReviewsBySearch(req, res) {
		try {
			const query = req.query.query;

			const reviews = await reviewService.getReviewsBySearch(query);

			return res.json(reviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get reviews by search error',
			});
		}
	}
}

module.exports = new ReviewController();
