const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const paymentRoutes = require('../routes/payment');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas
app.use('/payment', paymentRoutes);


const start = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = {start};
