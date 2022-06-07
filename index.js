// Express & Middleware imports.
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Documentation imports.
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Other imports.
import mongoose from 'mongoose';
import fs from 'fs';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect("mongodb://localhost:27017/boluscalc");

// Fixes: "has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
app.use(cors());

// Parse JSON bodys.
app.use(bodyParser.json())

// Import Routes
import hotshotsRoute from "./api/Hotshots/hotshots.routes.js";

// Use Routes
app.use('/api/hotshots', hotshotsRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

// API Documentation
const swaggerDefinition = JSON.parse(fs.readFileSync('./config/swaggerDefintion.json'));
  
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./api/Hotshots/hotshots.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));