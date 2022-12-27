const reviewModel = require('../models/review-model');
const reviewService = require('../service/review-service');

class ReviewController {
	async create(req, res) {
		try {
			const {title, artPiece, artGroup, tags, text, image, author, grade} =
				req.body;

			console.log(author);
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

	async getByTag(req, res) {
		const tag = req.query.tag;
		console.log(tag);
		try {
			const reviews = await reviewService.getByTag(tag);
			return res.json(reviews);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get reviews by tags error',
			});
		}
	}
}

module.exports = new ReviewController();
