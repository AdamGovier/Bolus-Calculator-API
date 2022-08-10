import ErrorResponse from '../../Responses/error.response.js';
import Hotshot from "../Models/hotshot.schema.js";

export default async (req, res) => {
    const {type, value} = req.params;

    if(type !== "barcode" && type !== "keyword") 
        return res.status(400).json(new ErrorResponse("Incorrect paramter provided (type), please refer to documentation."));
    
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
        res.status(hotshots.length ? 200 : 404).json(
            hotshots.map(hotshot => {
                return {
                    id : hotshot._id.toString(),
                    name: hotshot.name,
                    carbs: parseFloat(hotshot.carbohydrates),
                    weight: parseFloat(hotshot.weight),
                    imagePath: hotshot.imagePath,
                    barcode: hotshot.barcode
                }
            })
        )
    }
};