const commentService = require('../service/comment-service');

class CommentController {
	async create(req, res) {
		try {
			const {name, userId, reviewId, desc} = req.body;

			const comment = await commentService.create(name, userId, reviewId, desc);

			return res.json(comment);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Comment creation error',
			});
		}
	}

	async getAll(req, res) {
		try {
			const reviewId = req.params.reviewId;
			const comments = await commentService.getAll(reviewId);

			return res.json(comments);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Get all the comments error',
			});
		}
	}
}

module.exports = new CommentController();
