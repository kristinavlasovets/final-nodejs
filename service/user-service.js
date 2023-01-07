const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({email});
		if (candidate) {
			throw new Error('Email address is already registered.');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const user = await UserModel.create({
			email,
			password: hashPassword,
		});

		console.log(user);

		const userDto = new UserDto(user);

		console.log(userDto);
		const tokens = tokenService.generateTokens({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto};
	}

	async login(email, password) {
		const user = await UserModel.findOne({email});
		if (!user) {
			throw new Error(`Email address '${email}' is not registered.`);
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			throw new Error('Incorrect password.');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto};
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto});

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto};
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}

	async deleteOne(id) {
		const user = await UserModel.findOneAndDelete({_id: id}).populate([
			'createdReviews',
		]);
	}

	async blockOne(id) {
		const user = await UserModel.findByIdAndUpdate(id, {status: 'blocked'});
	}

	async unblockOne(id) {
		const user = await UserModel.findByIdAndUpdate(id, {status: 'active'});
	}

	async makeAdminOne(id) {
		const user = await UserModel.findByIdAndUpdate(id, {role: 'admin'});
	}

	async makeUserOne(id) {
		const user = await UserModel.findByIdAndUpdate(id, {role: 'user'});
	}
}

module.exports = new UserService();
