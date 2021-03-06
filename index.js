// Express & Middleware imports.
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import cors from 'cors';

// Documentation imports.
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Import Routes
import hotshotsRoute from "./api/Hotshots/hotshots.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Other imports.
import mongoose from 'mongoose';
import fs from 'fs';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect("mongodb://localhost:27017/boluscalc");

// Set template engine for admin panel.
app.set('view engine', 'ejs');

// Set public directory for the css & other assets of the admin panel.
app.use(express.static('public'));

// Fixes: "has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
app.use(cors());

// Parse JSON bodies.
app.use(bodyParser.json());

// Parse FORM bodies.
app.use(bodyParser.urlencoded({ extended: true }));

// Retrieve uploaded files.
app.use(fileUpload());

// Initialise session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Session only saved when modified rather than everytime.
    saveUninitialized: false // Don't save empty sessions with any default values.
}));

// Use Routes
app.use('/api/hotshots', hotshotsRoute);
app.use('/admin', adminRoutes);

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