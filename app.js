const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Middleware
app.use('/public', express.static(__dirname + '/public'));

// /:username Route
const userRoute = require('./routes/userpage');
app.use('/:username', userRoute);

// Startup Route
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/view/index.html');
})


//listening
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is Open");
});

