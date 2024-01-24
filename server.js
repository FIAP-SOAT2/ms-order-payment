require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./src/drivers/webserver/routes');

console.log(process.env.ACCESS_TOKEN);

// bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes)


app.use((err, req, res, next) => {
    if (err) {
        console.error(err.message)
        if (!err.statusCode) {
            err.statusCode = 500
        } // Set 500 server code error if statuscode not set
        return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message
        })
    }

    next()
})

// 404
app.use(function (req, res) {
    res.status(404).json({
        status: 'Page does not exist'
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})
