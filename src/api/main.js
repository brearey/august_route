const { Router } = require('express');

const router = new Router();

router.get('/', (request, response) => {
	try {
		return response.render('home', { title: 'August - Home page' });
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).render('500', { title: 'August - Internal server error' });
	}
});

router.get('/about', (request, response) => {
	try {
		return response.render('about', { title: 'August - About page' });
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).render('500', { title: 'August - Internal server error' });
	}
});

module.exports = router;
