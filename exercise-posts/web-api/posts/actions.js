const fs = require('fs');
const path = require('path');
const conn = require('../database');
const date = require('date-and-time');

getAllPostsQuery = () => {
    const query = 'SELECT * FROM post';
    return new Promise ((resolve, reject) => {
        conn.query(query, function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else{
                console.log(results);
                resolve(results);
            }
        });
    });

};

getAllPosts = async (req, res) => {

    try {
        const allPosts = await getAllPostsQuery();
        res.status(200).send(allPosts);
    }
    catch (error) {
        res.status(500).send(error);
    }
};

getSpecificPostQuery = (id) => {
    const query = 'SELECT * FROM post WHERE id = ?';
    return new Promise ((resolve, reject) => {
        conn.query(query, [id], function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else{
                console.log(results);
                resolve(results);
            }
        });
    });
};
getSpecificPost = async (req, res, next) => {

    if (req.params.id <= 0) {
        var error = new Error("Id can not be 0!");
        error.status = 401;
        next(error);
    }
    try {
        const specificPost = await getSpecificPostQuery(req.params.id);
        res.status(200).send(specificPost[0]);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
createPostQuery = (args) => {
    const query = "INSERT INTO post (text, likes, createdOn) VALUES (?, ?, ?)";
    const now = new Date();
    args.push(date.format(now, 'YYYY/MM/DD HH:mm:ss'));
    console.log(args);
    return new Promise ((resolve, reject) => {
        conn.query(query, args, function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else{
                console.log(results);
                resolve(results);
            }
        });
    });
};
createPost = async (req, res, next) => {
    let bodyArgs = Object.values(req.body);
    console.log(bodyArgs);
    try {
        const createPost = await createPostQuery(bodyArgs);
        res.status(200).send(createPost);
    }
    catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllPosts,
    getSpecificPost,
    createPost
};