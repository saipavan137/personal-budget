const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');

const mongoose = require('mongoose');
const  namesModel  = require("./models/budget_schema");
let url = 'mongodb://127.0.0.1:27017/budget';

// app.use(cors());

app.use('/', express.static('public'));

// app.get('/budget', (req, res) => {
//     fs.readFile('budget.json', 'utf8', (err, data) => { //Using fs module from nodejs to read from budget.json
//         if (err) { //In case of error, this will be thrown
//             console.error('Error reading budget.json:', err);
//             res.status(500).json({ error: 'Unable to read budget data' });
//             return
//         }

//         //Parses json file and puts it inside of budgetData
//         try {
//             const budgetData = JSON.parse(data);
//             res.json(budgetData); //Responds with budgetData array
//         } catch (parseError) { //In case of a parsing error
//             console.error('Error parsing JSON:', parseError);
//             res.status(500).json({ error: 'Unable to parse budget data' });
//         }
//     });
// });

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return namesModel.find({}); 
        })
        .then((data) => {
            const budgetData = data.length > 0 ? data[0].myBudget : [];
            res.json(budgetData); 
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Unable to fetch data from MongoDB' });
        })
        .finally(() => {
            mongoose.connection.close(); 
        });
});

app.get('/addNewbudget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return namesModel.find({})
        })
        .then((data) => {
            const newBudget = {title: "New thing", budget: 123, color: "#FFAABB"}
            data.push(newBudget);
            res.json(newBudget); 
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Unable to push' });
        })
        .finally(() => {
            mongoose.connection.close(); 
        });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});