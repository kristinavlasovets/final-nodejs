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
}

module.exports = new ReviewController();
