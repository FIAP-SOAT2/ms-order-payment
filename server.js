const express = require('express');
const bodyParser = require('body-parser');
const paymentController = require('./src/app/controllers/paymentController');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/payment', paymentController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
