const express = require('express');
const knex = require('./database/connection');
const pointsController = require('./controllers/points_controller');
const itemsController = require('./controllers/items_controller');

const routes = express.Router();

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

module.exports = routes;