const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 4200;
const DATA_FILE = 'data.json';

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Cross-Origin-Resource-Policy', "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, credentials');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.post('/save', (req, res) => {
    const data = req.body;

    if (fs.existsSync(DATA_FILE)) {
        const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        existingData.push(data);
        fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    } else {
        fs.writeFileSync(DATA_FILE, JSON.stringify([data], null, 2));
    }

    res.status(201).json({ message: 'Data saved successfully!' });
});



app.get('/get', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        res.status(200).json({data, message : 'Data found'});
    } else {
        res.status(404).json({ message: 'No data found!' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});