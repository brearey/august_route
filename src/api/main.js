const { Router } = require('express');

const router = new Router();

router.get('/', (request, response) => {
	try {
		return response.render('home', { title: 'Home page', appName: 'August app' });
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).render('500', { title: 'Internal server error', appName: 'August app' });
	}
});

router.get('/about', (request, response) => {
	try {
		return response.render('about', { title: 'About page', appName: 'August app' });
	} catch (error) {
		console.error(`Error: ${error.stack}`);
		response.status(500).render('500', { title: 'Internal server error', appName: 'August app' });
	}
});

module.exports = router;
