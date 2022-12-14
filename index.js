require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const router = require('./router/index');
const passport = require('passport');
const passportSetup = require('./passport');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: 'secretcode',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));

app.use('/api', router);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(`Server started on PORT = ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
