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

/**
 * @swagger
 * /api/hotshots/thumbnail/{image}:
 *  get:
 *      summary: Retrieve a Hotshot thumbnail by providing the filename.
 *      tags:
 *          - Hotshots
 *      parameters:
 *          - in: path
 *            name: image
 *            required: true
 *            description: The image to view. The filename is retrieved using GET /api/hotshots/get/{type}/{value}
 *            schema:
 *              type: string
 *              example: "7b748375-9969-4027-b803-e6f7e533615b.jpg"
 *      responses:
 *          500:
 *              description: 500 Internal Server Error. Returns a thumbnail with "No image found" imprinted.
 *              content:
 *                  application/json:
 *                      schmea:
 *                          type: file
 *          404:
 *              description: Not Found. Returns a thumbnail with "No image found" imprinted.
 *              content:
 *                  application/json:
 *                      schmea:
 *                          type: file
 *          200:
 *              description: OK. Returns the queried image.
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: file
 */
router.get('/thumbnail/:image', thumbnailController);
router.get('/thumbnail/', (req, res) => res.status(400).json(new ErrorResponse("Missing required url parameters (image), please refer to the documentation.")));
router.post('/thumbnail', (req, res) => res.status(400).json(new ErrorResponse("POST method not supported, did you mean to use the GET method?")));

/**
 * @swagger
 * /api/hotshots/create:
 *  post:
 *      summary: Creates a hotshot with the specified search parameters.
 *      tags:
 *          - Hotshots
 *      consumes:
 *          - multipart/form-data
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the Hotshot.
 *                  example: Slice of Pizza
 *                carbohydrates:
 *                  type: number
 *                  description: The name of the carbohydrates in grams per item or per weight.
 *                  example: 27
 *                image:
 *                  type: file
 *                  description: The thumbnail for the Hotshot. Please note that only '.png', '.jpg', '.jepg', '.webp' and '.heic' are supported. if an invalid filetype is provided it will be ignored without error as this is an optional field.
 *                weight:
 *                  type: number
 *                  description: The weight of the Hotshot in grams.
 *                  example: 160
 *                barcode:
 *                  type: string
 *                  description: A valid EAN number for the specific product (doesn't apply to all Hotshots).
 *                  example: 5901234123457
 *              required:
 *                  - name
 *                  - carbohydrates
 *      responses:
 *          200:
 *              description: OK. Returns this success message.
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           properties:
 *                              error:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: Hotshot submitted for approval.
 *          400:
 *              description: Bad Request. Invalid parameters were sent to the server.
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           properties:
 *                              error:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          message:
 *                                              type: string
 *                                              example: weight must be a number
 *                                          path:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                                  example: weight
 *          415:
 *              description: Unsupported Media Type. This route expects a request using 'multipart/form-data'.
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           properties:
 *                              error:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: Expecting content-type of 'multipart/form-data'.                              
 */
router.post('/create', createController);
router.get('/create', (req, res) => res.status(400).json(new ErrorResponse("GET method not supported, did you mean to use the POST method?")));

export default router;