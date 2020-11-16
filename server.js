const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (req, res) => {
    console.log(req.body);
});
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});