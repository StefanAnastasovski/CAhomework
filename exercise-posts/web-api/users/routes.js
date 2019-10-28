var express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/', actions.getAllUsers);
routes.get('/:id', actions.getSpecificUser);
routes.post('/', actions.createUser);

routes.put('/:id', (req, res) => {
    res.send("Full update for user with id = " + req.params.id);
});

routes.patch('/:id', (req, res) => {
    res.send("Partial update for user with id = " + req.params.id);
});

routes.delete('/:id', (req, res) => {
    res.send("Delete user with id = " + req.params.id);
});

module.exports = routes;