var express = require('express');
const actions = require('./actions');

var routes = express.Router();
//
routes.get('/', actions.getAllPosts);
routes.get('/:id', actions.getSpecificPost);
routes.post('/', actions.createPost);

routes.put('/:id', (req, res) => {
    res.send("Full update for post with id = " + req.params.id);
});

routes.patch('/:id', (req, res) => {
    res.send("Partial update for post with id = " + req.params.id);
});

routes.delete('/:id', (req, res) => {
    res.send("Delete post with id = " + req.params.id);
});

module.exports = routes;