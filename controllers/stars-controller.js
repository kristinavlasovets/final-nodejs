const starsService = require('../service/stars-service');

class StarsController {
	async create(req, res) {
		try {
			const {user, artPiece, value} = req.body;

			const stars = await starsService.create(user, artPiece, value);

			return res.json(stars);
		} catch (e) {
			console.log(e);
			res.status(500).json({
				message: 'Stars creation error',
			});
		}
	}
}

module.exports = new StarsController();
