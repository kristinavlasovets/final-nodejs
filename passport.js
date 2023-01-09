const passport = require('passport');
const UserModel = require('./models/user-model');
const tokenService = require('./service/token-service');
const UserDto = require('./dtos/user-dto');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GitHubStrategy = require('passport-github').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/api/auth/google/callback',
		},
		async function (accessToken, refreshToken, profile, cb) {
			const candidate = await UserModel.findOne({googleId: profile.id});

			if (candidate) {
				const userDto = new UserDto(candidate);

				const tokens = tokenService.generateTokens({...userDto});

				await tokenService.saveToken(userDto.id, tokens.refreshToken);

				const userData = {...tokens, user: userDto};
				console.log(userData);

				return cb(null, userData);
			}

			const user = await UserModel.create({
				googleId: profile.id,
				username: profile.displayName,
			});

			const userDto = new UserDto(user);

			const tokens = tokenService.generateTokens({...userDto});

			await tokenService.saveToken(userDto.id, tokens.refreshToken);

			const userData = {...tokens, user: userDto};
			console.log(userData);

			return cb(null, userData);
		}
	)
);

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: '/api/auth/github/callback',
		},
		async function (accessToken, refreshToken, profile, cb) {
			await UserModel.findOne({googleId: profile.id}),
				async (err, doc) => {
					if (err) {
						console.log('error');
						return cb(err, null);
					}

					const user = await UserModel.create({
						gitHubId: profile.id,
						username: profile.username,
					});

					const userDto = new UserDto(user);

					const tokens = tokenService.generateTokens({...userDto});

					await tokenService.saveToken(userDto.id, tokens.refreshToken);

					const userData = {...tokens, user: userDto};

					return cb(null, userData);
				};
			console.log(profile.id);
			console.log(profile.username);
			cb(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
