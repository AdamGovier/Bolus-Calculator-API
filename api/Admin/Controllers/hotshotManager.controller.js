import ErrorResponse from '../../Shared/Responses/error.response.js';
import log from "../../Shared/Helpers/log.js";
import Hotshot from "../../Hotshots/Models/Hotshot.schema.js";

export const getHotshots = async (req,res) => {
    const statusTypes = ["Pending", "Active", "Archived", "All"];

    const {status, keyword} = req.params;

    if(!statusTypes.includes(status)) return res.status(400).json(new ErrorResponse('Invalid status, please provide a valid enum: "pending", "active", "archived", "all"'));
    
    const hotshots = await Hotshot.find({
        // In case of status == "all" provide an empty string otherwise provide the status type provided.
        status: { $regex: status === "All" ? "" : status, $options: 'i'}, 
        name: { $regex: keyword ?? "", $options: 'i' }
    });

    res.status(hotshots.length ? 200 : 404).json(
        hotshots.map(hotshot => { return {
            id: hotshot.id,
            name: hotshot.name,
            carbs: parseFloat(hotshot.carbohydrates),
            weight: parseFloat(hotshot.weight),
            imagePath: hotshot.imagePath,
            barcode: hotshot.barcode,
            status: hotshot.status
        }})
    );
}