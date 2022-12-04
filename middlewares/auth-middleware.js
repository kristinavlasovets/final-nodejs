const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return res.status(400).json({
				message: 'User is not authorized.',
			});
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return res.status(400).json({
				message: 'User is not authorized.',
			});
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return res.status(400).json({
				message: 'User is not authorized.',
			});
		}

		req.user = userData;
		next();
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			message: 'Authorization error.',
		});
	}
};
