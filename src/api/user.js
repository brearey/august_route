const {Router} = require('express');
const User = require('../persistence/users');

const router = new Router();

router.post('/', async (request, response) => {
	try {
		const {email, password} = request.body;
		if (!email || !password) {
			return response
				.status(400)
				.json({message: 'email and password must be provided'});
		}

		const user = await User.create(email, password);
		if (!user) {
			return response.status(400).json({message: 'User already exists'});
		}

		return response.status(200).json(user);
	} catch (error) {
		console.error(
			`createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
		);
		response.status(500).json();
	}
});

router.get('/me', async (request, response) => {
	try {
		const user = await User.find({
			email: request.query.email
		});
		if (!user) {
			return response.status(404).json({message: `User with email: ${request.query.email} not found`});
		}

		return response.status(200).json(user);
	} catch (error) {
		console.error(
			`find User ({ email: ${request.query.email} }) >> Error: ${error.stack}`
		);
		response.status(500).json();
	}
});

module.exports = router;
