module.exports = class UserDto {
	email;
	id;
	status;
	role;
	createdReviews;
	likedReviews;
	ratedArtPieces;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.status = model.status;
		this.role = model.role;
		this.createdReviews = model.createdReviews;
		this.likedReviews = model.likedReviews;
		this.ratedArtPieces = model.ratedArtPieces;
	}
};
