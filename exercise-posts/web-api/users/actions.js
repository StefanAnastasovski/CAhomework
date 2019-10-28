const fs = require('fs');
const path = require('path');
const { emailValidator } = require('../helper');
const conn = require('../database');


getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
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

getAllUsers = async (req, res) => {
    // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    // let users = JSON.parse(rawdata);
    //shto dobivame nazad sekogash e lista !
    try {
        const allUsers = await getAllUsersQuery();
        res.status(200).send(allUsers);
    }
    catch (error) {
        res.status(500).send(error);
    }
};

getSpecificUserQuery = (id) => {
    const query = 'SELECT * FROM user WHERE id = ?';
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
getSpecificUser = async (req, res, next) => {
    // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    // let users = JSON.parse(rawdata);

    if (req.params.id <= 0) {
        var error = new Error("Id can not be 0!");
        error.status = 401;
        next(error);
    }

    // let currentUser = users.filter((x) => {
    //     return x.id == req.params.id;
    // });

    try {
        //vo rutes e kazadno deka ke e id, :id
        const specificUser = await getSpecificUserQuery(req.params.id);
        res.status(200).send(specificUser[0]);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
createUserQuery = (args) => {
    const query = "INSERT INTO user (Name, Surname, Email, Age, IsActive) VALUES (?, ?, ?, ?, ?)";
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
createUser = async (req, res, next) => {
    let bodyArgs = Object.values(req.body);

    try {
        const createUser = await createUserQuery(bodyArgs);
        res.status(200).send(createUser);
    }
    catch (error) {
        res.status(500).send(error);
    }
    // let isValid = emailValidator(req.body.email);
    // if (!isValid) {
    //     var error = new Error("Email is not valid!");
    //     error.status = 401;
    //     next(error);
    // }
    // else {
    // let rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
    // let users = JSON.parse(rawdata);
    //
    //
    // users.push(req.body);
    //
    // let data = JSON.stringify(users);
    // fs.writeFileSync(path.join(__dirname, 'users.json'), data);
    //
    // res.status(201).send("User has been created!");
    // }
};

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser
}