// Express & Middleware imports.
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Documentation imports.
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Import Routes
import hotshotsRoute from "./api/Hotshots/hotshots.routes.js";
import adminRoutes from "./api/Admin/admin.routes.js";

// Other imports.
import mongoose from 'mongoose';
import fs from 'fs';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;

// Database connection
mongoose.connect(process.env.mongo_connection_string);

// Set template engine for admin panel.
app.set('view engine', 'ejs');

// Fixes: "has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
app.use(cors({
    exposedHeaders: ['access-token'],
    credentials: true,
    origin: ['http://localhost:8080'] // Local front end for testing purposes only.
}));

// Parse cookies for authentication purposes.
app.use(cookieParser());

// Parse JSON bodies.
app.use(bodyParser.json());

// Parse FORM bodies.
app.use(bodyParser.urlencoded({ extended: true }));

// Retrieve uploaded files.
app.use(fileUpload());

// Use Routes
app.use('/api/hotshots', hotshotsRoute);
app.use('/api/admin', adminRoutes);
if(process.env.NODE_ENV === "production") {
    app.use('/admin', express.static("C:/home/site/wwwroot/public/admin"));
} else {
    app.use('/admin', express.static('public/admin'));
}
app.get('/', (req,res) => res.send("Bolus Calc API Alpha"))

// Start server.
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// API Documentation
const swaggerDefinition = JSON.parse(fs.readFileSync('./config/swaggerDefintion.json'));
  
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./api/Hotshots/hotshots.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));