const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const paymentRoutes = require('../routes/payment');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const {receive} = require('../../infra/aws/sqs.consumer');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, '../../interfaces/swagger/api_doc.yaml'));

setInterval(receive, 10000);
const app = express();
const port = process.env.PORT || 4004;
app.use(bodyParser.json());

app.use((_req, res, next) => {
    res.set('Content-Security-Policy', "default-src 'self'; frame-ancestors 'self'; form-action 'self'")
        .header('X-Content-Type-Options', 'nosniff')
        .removeHeader('X-Powered-By');
    next();
});

// Rotas
app.use('/api/payment', paymentRoutes);
app.use('/payment/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/payment/health-check', (req, res) => {
    res.status(200).send('OK');
});

app.use((_req, res) => {
    res.set('Content-Security-Policy', "default-src 'self'; frame-ancestors 'self'; form-action 'self'")
        .header('X-Content-Type-Options', 'nosniff')
        .status(404)
        .send('Resource not found')
});

const start = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = {start};
