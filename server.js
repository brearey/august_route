require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const clientSession = require('client-sessions');
const helmet = require('helmet');

const app = express();
const api = require('./src/api');

app.use(morgan('short'));
app.use(express.json());
app.use(
	clientSession({
		cookieName: 'session',
		secret: process.env.SESSION_SECRET,
		duration: 24 * 60 * 60 * 1000
	})
);
app.use(helmet());

app.use(api);

let server;
module.exports = {
	start() {
		server = app.listen(process.env.PORT, () => {
			console.log(`App started on port ${process.env.PORT} and mode=${app.get('env')}`);
		});
		return app;
	},
	stop() {
		server.close();
	}
};
