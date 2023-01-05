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

	// async loginWithGoogle(req, res, next) {
	// 	try {
	// 		const user = userModel.findOne({email: req.body.email});
	// 		if (user) {
	// 			res.cookie('refreshToken', user.refreshToken, {
	// 				maxAge: 30 * 24 * 60 * 60 * 1000,
	// 				httpOnly: true,
	// 			});

	// 			return res.json(user);
	// 		} else {
	// 			const newUser = new userModel({...req.body, fromGoogle: true});
	// 			const savedUser = await newUser.save();
	// 			res.cookie('refreshToken', savedUser.refreshToken, {
	// 				maxAge: 30 * 24 * 60 * 60 * 1000,
	// 				httpOnly: true,
	// 			});

	// 			return res.json(savedUser);
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

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
