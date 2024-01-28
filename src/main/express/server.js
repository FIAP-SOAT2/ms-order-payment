const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
// const swaggerSpecs = require('../interfaces/swagger/swagger');
const paymentRoutes = require('../routes/payment');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas
app.use('/payment', paymentRoutes);

// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


const start = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = { start };
