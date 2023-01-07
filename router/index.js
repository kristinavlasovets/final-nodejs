const Router = require('express').Router;

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
router.post('/login', userController.login);
// router.post('/login/google', userController.loginWithGoogle);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteOne);
router.patch('/users/block/:id', userController.blockOne);
router.patch('/users/unblock/:id', userController.unblockOne);
router.patch('/users/make-admin/:id', userController.makeAdminOne);
router.patch('/users/make-user/:id', userController.makeUserOne);

router.patch('/users/likes/:reviewId', userController.likeReview);

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
// router.get('/reviews/search', reviewController.getBySearch);
router.delete('/reviews/:id', reviewController.deleteOne);
router.patch('/reviews/:id', reviewController.updateOne);

router.post('/art-pieces/new', artPieceController.create);
router.get('/art-pieces', artPieceController.getAll);
router.put('/art-pieces/rating', artPieceController.createRating);

router.post('/stars', starsController.create);

router.post('/comments', commentController.create);
router.get('/comments/:reviewId', commentController.getAll);

module.exports = router;
