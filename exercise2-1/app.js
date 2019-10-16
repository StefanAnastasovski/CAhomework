let express = require('express');
let bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);
});
dsad
app.get('/read', (req, res) => {
    'use strict';

    let rawdata = fs.readFileSync('student.json');
    let student = JSON.parse(rawdata);
    console.log(student);
    res.send(student);

});


app.get('/write', (req, res) => {
    'use strict';

    let student = [
        {
            "name": "Martin",
            "surname": "Martinovski",
            "email": "martin@gmail.com",
            "age": 20,
            "index": "333/2017",
            "isActive": false
        },
        {
            "name": "Marija",
            "surname": "Stojkovska",
            "email": "marija@gmail.com",
            "age": 28,
            "index": "11/2009",
            "isActive": true
        },
        {
            "name": "Nikola",
            "surname": "Stojkovski",
            "email": "nikola@gmail.com",
            "age": 24,
            "index": "565/2013",
            "isActive": true
        }
    ];

    let data = JSON.stringify(student, null, '\t');
    fs.writeFileSync('student2.json', data);
    console.log(student);
    res.send(student);

});

