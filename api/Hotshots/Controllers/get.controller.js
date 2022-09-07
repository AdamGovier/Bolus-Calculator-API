import ErrorResponse from '../../Shared/Responses/error.response.js';
import log from "../../Shared/Helpers/log.js";
import Hotshot from "../Models/Hotshot.schema.js";

export default async (req, res) => {
    const {type, value} = req.params;

    if(type !== "barcode" && type !== "keyword") 
        return log({
            errorCode: 400,
            hint: "API Request made missing a required parameter ('barcode' || 'keyword')",
            location: "get.controller.js"
        }, () => res.status(400).json(new ErrorResponse("Incorrect paramter provided (type), please refer to documentation.")));
    
    if(type === "keyword") {
        // Find a hotshot including the keyword.
        const hotshots = await Hotshot.find({name: { $regex: value, $options: 'i' }, status: "active"});
        sendResponse(hotshots);
    } else if (type === "barcode") {
        // Find a hotshot using the barcode number.
        const hotshots = await Hotshot.find({barcode: value, status: "active"});
        sendResponse(hotshots);
    }

    function sendResponse(hotshots) {
        return log({
            errorCode: hotshots.length ? 200 : 404,
            hint: `Hotshot retrieval API pinged. Search term: "${value}".`
        },
        () => res.status(hotshots.length ? 200 : 404).json(
            hotshots.map(hotshot => {
                return {
                    id: hotshot._id.toString(),
                    name: hotshot.name,
                    carbs: parseFloat(hotshot.carbohydrates),
                    weight: parseFloat(hotshot.weight),
                    imagePath: hotshot.imagePath,
                    barcode: hotshot.barcode
                }
            })
        ));
    }
};