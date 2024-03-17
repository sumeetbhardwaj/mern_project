const express = require("express")
const cors = require('cors');
require("dotenv").config();
const bodyParser = require('body-parser');
const router = require("./router/routes")
require('./database').mongodb();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = process.env.PORT || 8080

app.use(cors()); 

app.use(bodyParser.json());
app.use(express.json());
app.use(router)

// Use Swagger UI Express for API documentation
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, ()=> console.log(`Server run on ${port}`))
