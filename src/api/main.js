const { Router } = require('express');

const router = new Router();

router.get('/', (request, response) => {
	try {
		return response.render('home');
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).render('500');
	}
});

router.get('/about', (request, response) => {
	try {
		return response.render('about');
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).render('500');
	}
});

module.exports = router;
