import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import fs from 'fs';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect("mongodb://localhost:27017/boluscalc");

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