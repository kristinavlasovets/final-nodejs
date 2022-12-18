const reviewService = require('../service/review-service');

class ReviewController {
	async create(req, res) {
		try {
			const {title, artPiece, group, tags, text, image, author, grade} =
				req.body;

			console.log(author);
			const review = await reviewService.create(
				title,
				artPiece,
				group,
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
}

module.exports = new ReviewController();
