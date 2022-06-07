import ErrorResponse from '../../Responses/error.response.js';
import hotshotVSchema from "../Validation/hotshot.schema.js";
import hotshotSchema from "../Models/hotshot.schema.js";

export default async (req, res) => {
    if(!req.is('application/json')) return res.status(415).json(new ErrorResponse("Expecting content-type of 'application/json'."));
    
    const validate = hotshotVSchema.validate(req.body);
    if(validate.error) return res.status(400).json(new ErrorResponse(validate.error.details));

    const hotshot = new hotshotSchema({...req.body, status:"pending"});
    await hotshot.save();

    res.status(201).json({
        error: false,
        message: "Hotshot submitted for approval."
    });
};