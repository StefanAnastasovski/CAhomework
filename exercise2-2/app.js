//kade imam koristeno so fullName pracav kako parametar /ime prezime
//posle za put i patch dodadov id i so id reshavav, moze da se prepravi se so id da se raboti
let express = require('express');
let bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
});

app.get('/users', (req, res) => {
    'use strict';

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    res.send(users);
    console.log(users);

});

app.get('/activeUsers', (req, res) => {

    'use strict';

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    let listActiveUsers = users.filter((objTerm) => {
        if (objTerm.isActive)
            return objTerm;

    });
    res.send(listActiveUsers);

});
app.get('/inactiveUsers', (req, res) => {
    'use strict';

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    let listActiveUsers = users.filter((objTerm) => {
        if (!objTerm.isActive)
            return objTerm;
    });
    res.send(listActiveUsers);

});
app.get('/allUsersActive', (req, res) => {
    'use strict';

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    let listActiveUsers = users.map((objTerm) => {
        if (!objTerm.isActive) {
            objTerm.isActive = true;
            return objTerm;
        } else {
            return objTerm;
        }

    });
    res.send(listActiveUsers);

});
app.get('/maxage', (req, res) => {
    'use strict';

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    let maxAge = users.reduce((maxage, currentValue) => {
        let max;
        if(!max)
            max = maxage.age;

        if (currentValue.age > max) {
            max = currentValue.age;
            return currentValue;
        }
        else
            return maxage;

    });
    console.log(maxAge);
    res.send(maxAge.name + " " +  maxAge.surname + "    Age: " + maxAge.age.toString());

});



app.get('/users/:fullName', (req, res) => {
    'use strict';
    let fullname = req.params;

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    for (var i = 0; i < users.length; i++) {

        try {
            console.log((i + 1));
            if (users[i].name.toLowerCase() === fullname.fullName.toLowerCase().split(" ")[0] &&
                users[i].surname.toLowerCase() === fullname.fullName.toLowerCase().split(" ")[1]) {
                console.log(users[i]);
                res.send(users[i]);
            }

        } catch (e) {

        }
    }
});

app.post('/users/create', (req, res) => {
    'use strict';

    var createUser = req.body;
    let regexString = /[a-zA-Z]+/;
    let regexAge = /[1-9][0-9]/;
    let regexEmail = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/;
    let regexIsActive = /true || false/;
    if (createUser.name && createUser.surname && createUser.age && createUser.email && createUser.isActive.toString())
        if (createUser.name.match(regexString) && createUser.surname.match(regexString) && createUser.age.toString().match(regexAge) && createUser.age >= 18)
            if (createUser.email.match(regexEmail) && createUser.isActive.toString().match(regexIsActive)) {
                console.log(createUser);
                res.send(createUser);
            }

    // let data = JSON.stringify(createUser, null, 2);
    // fs.writeFileSync('user.json', data);

    // or ?
    let rawdata = fs.readFileSync('users.json');
    let usersList = JSON.parse(rawdata);
    usersList.push(createUser);
    let data = JSON.stringify(usersList, null, 2);
    fs.writeFileSync('users.json', data);


});

app.delete('/users/delete', (req, res) => {
    'use strict';
    let fullname = req.body;
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    for (var i = 0; i < users.length; i++) {
        try {
            if (users[i].name.toLowerCase() === fullname.name.toLowerCase() &&
                users[i].surname.toLowerCase() === fullname.surname.toLowerCase())
                users.splice(i,1);

        } catch (e) {

        }
    }
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data, {'flag': "a"});

});

app.put('/users/put/:id', (req, res) => {
    'use strict';
    let id = req.params;
    let num = id.id -1 ;
    let newUser = req.body;
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);


    let updateUser = {
        "id" : id.id,
        "name" : newUser.name.charAt(0).toUpperCase() + newUser.name.substring(1),
        "surname" : newUser.surname.charAt(0).toUpperCase() + newUser.surname.substring(1),
        "email" : newUser.email,
        "age" : newUser.age,
        "isActive" : newUser.isActive
    };

    users[num] = updateUser;

    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data);
    res.send(updateUser)

});

app.patch('/users/patch/:id', (req, res) => {
    'use strict';

    let id = req.params;
    let num = id.id -1 ;
    let updateUser = req.body;
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    let keysUpdate = Object.keys(updateUser);
    let valuesUpdate = Object.values(updateUser);
    // console.log(users[num]);

    let array = keysUpdate.map(  (item, index) => {
        return users[num][item] = valuesUpdate[index];
    });

    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync('users.json', data);
    res.send(updateUser)

});