const Router = require('express').Router;

const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');
const reviewController = require('../controllers/review-controller');
const artPieceController = require('../controllers/artPiece-controller');
const starsController = require('../controllers/stars-controller');

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 29}),
	userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

router.put('/users/likes/:reviewId', userController.likeReview);

router.post('/reviews', reviewController.create);
router.get('/reviews/:id', reviewController.getOne);
router.get('/reviews', reviewController.getAll);
router.get('/reviews/get-by-tag/tag', reviewController.getByTag);
// router.get('/reviews/search', reviewController.getBySearch);
// router.delete('/reviews', reviewController.delete);
// router.patch('/reviews', reviewController.update);
// router.post('/review/like/:id', reviewController.likeReview);

router.post('/art-pieces/new', artPieceController.create);
router.get('/art-pieces', artPieceController.getAll);

router.post('/stars', starsController.create);

module.exports = router;
