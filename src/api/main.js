const { Router } = require('express');

const router = new Router();

router.get('/', (request, response) => {
	try {
		return response.render('index');
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).json();
	}
});

router.get('/about', (request, response) => {
	try {
		return response.render('about');
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).json();
	}
});

module.exports = router;
