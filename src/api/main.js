const { Router } = require('express');

const router = new Router();

router.get('/', (request, response) => {
	try {
		return response.status(200).send('<h1>Main page</h1>');
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).json();
	}
});

module.exports = router;
