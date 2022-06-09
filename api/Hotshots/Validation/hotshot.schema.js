import Joi from "joi";
import Barcoder from "barcoder";

// Validation schema for a hotshot entry.

const hotshotSchema = Joi.object({
    name: Joi.string().required(),
    carbohydrates: Joi.number().greater(0).less(250).required(),
    weight: Joi.number().greater(0).less(1000),
    image: Joi.any(),
    barcode: Joi.string().custom((value, helper) => {
        // && value so it allows undefined values.
        if(!Barcoder.validate(value) && value) return helper.message("Invalid EAN.");

        return true;
    })
});

export default hotshotSchema;