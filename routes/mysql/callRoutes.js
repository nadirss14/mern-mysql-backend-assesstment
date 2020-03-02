const Express = require('express');
const CallService = require('../../services/mysql/CallServices');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app, BASE_URL) => {
	const router = Express.Router();
	const path = `/${BASE_URL}/call`;

	app.use(path, router);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	router.get('/', async (req, resp, next) => {
		try {
			const data = await CallService.getAllCalls();
			resp.status(200).json(data);
		} catch (error) {
			console.log(`Error en ${req.url}: ${error.message}`);
		}
	});

	// router.put('/', async (req, resp, next) => {
	// 	try {
	// 		console.log(req.body);
	// 		const data = await CallService.updateAgent(req.body);
	// 		resp.status(200).json(data);
	// 	} catch (error) {
	// 		console.log(`Error en ${req.originalUrl}: ${error.message}`);
	// 	}
	// });
};
