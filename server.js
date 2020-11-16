const express = require('express');
const app = express();

const axios = require('axios').default;

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// API Key
const apiKey = 'f84009647ce2a9db9dcff46b58632a4b';


app.post('/api', async (req, res) => {
    console.log(req.body);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.name}&units=metric&appid=${apiKey}`;

    //wait for response and convert into JSON format
    const resp = await axios.get(url);
    // const data = await resp.json();
    res.json(resp.data);

    // console.log(resp.data);

});
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});