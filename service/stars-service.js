const StarsModel = require('../models/stars-model');

class StarsService {
	async create(user, artPiece, value) {
		const stars = await StarsModel.create({
			user,
			artPiece,
			value,
		});

		return stars;
	}
}

module.exports = new StarsService();
