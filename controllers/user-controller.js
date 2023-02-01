const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const reviewService = require('../service/review-service');
const userModel = require('../models/user-model');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				console.log(errors);
				return res.status(400).json({message: 'Registration error', errors});
			}

			console.log(req.body);

			const {email, password} = req.body;
			const userData = await userService.registration(email, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (e) {
			console.log(e);
		}
	}

	async login(req, res, next) {
		try {
			const {email, password} = req.body;
			const userData = await userService.login(email, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (e) {
			console.log(e);
		}
	}
	async logout(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			console.log(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			const userData = await userService.refresh(refreshToken);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (e) {
			console.log(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		} catch (e) {
			console.log(e);
		}
	}

	async deleteOne(req, res) {
		try {
			const {id} = req.params;
			const user = await userService.deleteOne(id);

			return res.json(user);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Delete exact user error',
			});
		}
	}

	async blockOne(req, res) {
		try {
			const {id} = req.params;
			const user = await userService.blockOne(id);

			return res.json(user);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Block exact user error',
			});
		}
	}

	async unblockOne(req, res) {
		try {
			const {id} = req.params;
			const user = await userService.unblockOne(id);

			return res.json(user);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Unblock exact user error',
			});
		}
	}

	async makeAdminOne(req, res) {
		try {
			const {id} = req.params;
			const user = await userService.makeAdminOne(id);

			return res.json(user);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Make admin exact user error',
			});
		}
	}

	async makeUserOne(req, res) {
		try {
			const {id} = req.params;
			const user = await userService.makeUserOne(id);

			return res.json(user);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Make user exact admin error',
			});
		}
	}

	async likeReview(req, res, next) {
		const id = req.body.userId;
		const reviewId = req.params.reviewId;

		try {
			await reviewService.likeReview(id, reviewId);
			res.status(200).json('The review has been liked');
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new UserController();
