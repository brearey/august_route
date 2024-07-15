const express = require('express');

const { Router } = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const mainRouter = require('./main');

router.get('/health', (request, response) => response.sendStatus(200));
router.use('/api/users', user);
router.use('/api/sessions', session);

router.use('/', mainRouter);

router.use('*', (request, response) => response.render('404', { title: 'August - Not found' }));

module.exports = router;
