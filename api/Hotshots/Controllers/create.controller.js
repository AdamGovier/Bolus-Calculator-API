import ErrorResponse from '../../Shared/Responses/error.response.js';
import log from "../../Shared/Helpers/log.js";
import hotshotVSchema from "../Validation/hotshot.schema.js";
import hotshotSchema from "../Models/Hotshot.schema.js";
import fileHandler from "../Helpers/fileHandler.js";

export default async (req, res) => {
    if(!req.is('multipart/form-data')) return log({
        errorCode: 415,
        hint: "Wrong content-type submitted when creating a hotshot.",
        location: "create.controller.js"
    }, () => res.status(415).json(new ErrorResponse("Expecting Content-Type of 'multipart/form-data'.")));
    
    const validate = hotshotVSchema.validate(req.body);
    if(validate.error) return log({
        errorCode: 400,
        hint: "Bad data provided when creating hotshot",
        location: "create.controller.js",
        fullError: validate.error.details
    }, () => res.status(400).json(new ErrorResponse(validate.error.details)));
    
    const imagePath = await fileHandler(req);
    
    const hotshot = new hotshotSchema({...req.body, status:"pending", imagePath});
    await hotshot.save();

    log({
        errorCode: 200,
        hint: `Hotshot created (${req.body.name}).`
    }, () => res.status(200).json({
        error: false,
        message: "Hotshot submitted for approval."
    }));
};