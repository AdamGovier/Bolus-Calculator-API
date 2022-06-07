// Controllers
import getController from './Controllers/get.controller.js';
import createController from './Controllers/create.controller.js';
import thumbnailController from "./Controllers/thumbnail.controller.js";

// Responses
import ErrorResponse from '../Responses/error.response.js';

// Express Router
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/hotshots/get/{type}/{value}:
 *  get:
 *      summary: Finds hotshots with the specified search parameters.
 *      tags:
 *          - Hotshots
 *      parameters:
 *          - in: path
 *            name: type
 *            required: true
 *            description: The type of search either "barcode" or "keyword".
 *            schema:
 *              type: string
 *          - in: path
 *            name: value
 *            required: true
 *            description: Either the barcode number or keyword(s) to search for.
 *            schema:
 *              type: string
 *      responses:
 *          404:
 *              description: Not Found. Hotshot wasn't found in the database, returns empty array.
 *              content:
 *                  application/json:
 *                      schmea:
 *                          type: array
 *                          default: []
 *          200:
 *              description: OK. Returns a list of hotshots.
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: array
 *                           items:
 *                               type: object
 *                               properties:
 *                                    id:
 *                                       type: string
 *                                       description: The Hotshot ID.
 *                                       example: 62444d852693565a194c5a31
 *                                    name:
 *                                        type: string
 *                                        description: The name of the Hotshot.
 *                                        example: Pizza Slice
 *                                    carbohydrates:
 *                                        type: number
 *                                        description: The number of carbohydrates in grams.
 *                                        example: 28
 *                                    weight:
 *                                        type: number
 *                                        description: The weight of the Hotshot in grams.
 *                                        example: 195
 *                                    imagePath:
 *                                        type: string
 *                                        description: The path on the API to map the image to.
 *                                        example: /uploads/Hotshots/Images/62444d852693565a194c5a31.jpg
 *                                    barcode:
 *                                        type: string
 *                                        description: The barcode number of the Hotshot (if applicable).
 *                                        example: 9310174024827
 */
router.get('/get/:type/:value', getController);
router.get('/get/', (req, res) => res.status(400).json(new ErrorResponse("Missing required url parameters (type, value), please refer to the documentation.")));
router.get('/get/:type', (req, res) => res.status(400).json(new ErrorResponse("Missing required url parameter (value), please refer to the documentation.")));

router.post('/create', createController);
router.get('/create', (req, res) => res.status(400).json(new ErrorResponse("GET method not supported, did you mean to use the POST method?")));

router.get('/thumbnail/:image', thumbnailController);
router.get('/thumbnail/', (req, res) => res.status(400).json(new ErrorResponse("Missing required url parameters (image), please refer to the documentation.")));
router.post('/thumbnail', (req, res) => res.status(400).json(new ErrorResponse("POST method not supported, did you mean to use the GET method?")));

export default router;