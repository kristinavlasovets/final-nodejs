const Router = require('express').Router;
const passport = require('passport');

const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');
const reviewController = require('../controllers/review-controller');
const artPieceController = require('../controllers/artPiece-controller');
const starsController = require('../controllers/stars-controller');
const commentController = require('../controllers/comment-controller');

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 29}),
	userController.registration
);

router.get(
	'/auth/google',
	passport.authenticate('google', {scope: ['profile', 'email']})
);
router.get(
	'/auth/google/callback',
	passport.authenticate('google', {failureRedirect: '/login'}),
	function (req, res) {
		const {user} = req;
		res.cookie('refreshToken', user.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		res.redirect(process.env.CLIENT_URL);
	}
);

router.get('/get-user', (req, res) => {
	res.send(req.user);
});

router.get(
	'/auth/github',
	passport.authenticate('github', {scope: ['profile', 'email']})
);

router.get(
	'/auth/github/callback',
	passport.authenticate('github', {failureRedirect: '/login'}),
	function (req, res) {
		const {user} = req;
		res.cookie('refreshToken', user.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		res.redirect(process.env.CLIENT_URL);
	}
);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteOne);
router.patch('/users/block/:id', userController.blockOne);
router.patch('/users/unblock/:id', userController.unblockOne);
router.patch('/users/make-admin/:id', userController.makeAdminOne);
router.patch('/users/make-user/:id', userController.makeUserOne);

router.patch(
	'/users/likes/:reviewId',
	authMiddleware,
	userController.likeReview
);

router.post('/reviews', reviewController.create);
router.get('/reviews/:id', reviewController.getOne);
router.get('/reviews', reviewController.getAll);
router.get('/most-rated-reviews', reviewController.getMostRated);
router.get('/most-recent-reviews', reviewController.getMostRecent);
router.get('/by-tag-reviews/:tag', reviewController.getReviewsbyTag);
router.get('/by-user-reviews/:userId', reviewController.getReviewsbyUser);
router.get(
	'/by-artpiece-reviews/:artPieceId',
	reviewController.getReviewsbyArtPiece
);
router.get('/tags', reviewController.getAllTags);
router.get('/by-search-reviews', reviewController.getReviewsBySearch);
router.delete('/reviews/:id', reviewController.deleteOne);
router.patch('/reviews/:id', reviewController.updateOne);

router.post('/art-pieces/new', artPieceController.create);
router.get('/art-pieces', artPieceController.getAll);
router.put('/art-pieces/rating', artPieceController.createRating);

router.post('/stars', starsController.create);

router.post('/comments', commentController.create);
router.get('/comments/:reviewId', commentController.getAll);

module.exports = router;
