module.exports = class UserDto {
	email;
	id;
	status;
	role;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.status = model.status;
		this.role = model.role;
	}
};
