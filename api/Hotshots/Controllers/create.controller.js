import ErrorResponse from '../../Responses/error.response.js';
import hotshotVSchema from "../Validation/hotshot.schema.js";
import hotshotSchema from "../Models/hotshot.schema.js";
import fileHandler from "../Helpers/fileHandler.js";

export default async (req, res) => {
    if(!req.is('multipart/form-data')) return res.status(415).json(new ErrorResponse("Expecting content-type of 'multipart/form-data'."));
    
    console.log(req.body);
    const validate = hotshotVSchema.validate(req.body);
    if(validate.error) return res.status(400).json(new ErrorResponse(validate.error.details));

    const imagePath = await fileHandler(req);
    
    const hotshot = new hotshotSchema({...req.body, status:"pending", imagePath});
    await hotshot.save();

    res.status(201).json({
        error: false,
        message: "Hotshot submitted for approval."
    });
};