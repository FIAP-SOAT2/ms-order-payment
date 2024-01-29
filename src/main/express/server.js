const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const paymentRoutes = require('../routes/payment');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, '../../interfaces/swagger/api_doc.yaml'));
// const swaggerDocument = YAML.load('../../interfaces/api_doc.yaml');

const app = express();
const port = process.env.PORT || 4004;

app.use(bodyParser.json());

// Rotas
app.use('/payment', paymentRoutes);
app.use('/payment/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const start = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = {start};
