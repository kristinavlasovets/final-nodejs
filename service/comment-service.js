const CommentModel = require('../models/comment-model');

class CommentService {
	async create(name, userId, reviewId, desc) {
		const comment = await CommentModel.create({name, userId, reviewId, desc});

		return comment;
	}
	async getAll(reviewId) {
		const comments = await CommentModel.find({reviewId});

		return comments;
	}
}

module.exports = new CommentService();
