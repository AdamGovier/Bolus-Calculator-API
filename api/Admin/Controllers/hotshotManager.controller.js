import ErrorResponse from '../../Shared/Responses/error.response.js';
import Hotshot from "../../Hotshots/Models/Hotshot.schema.js";

export const getHotshots = async (req,res) => {
    const statusTypes = ["Pending", "Active", "Archived", "All"];

    const {status, keyword} = req.params;

    if(!statusTypes.includes(status)) return res.status(400).json(new ErrorResponse('Invalid status, please provide a valid enum: "Pending", "Active", "Archived", "All"'));
    
    const hotshots = await Hotshot.find({
        // In case of status == "all" provide an empty string otherwise provide the status type provided.
        status: { $regex: status === "All" ? "" : status, $options: 'i'}, 
        name: { $regex: keyword ?? "", $options: 'i' }
    });

    res.status(hotshots.length ? 200 : 404).json(
        hotshots.map(hotshot => {return {
            id: hotshot.id,
            name: hotshot.name,
            carbs: parseFloat(hotshot.carbohydrates),
            weight: parseFloat(hotshot.weight),
            imagePath: hotshot.imagePath,
            barcode: hotshot.barcode,
            status: hotshot.status,
            createdAt: hotshot.createdAt
        }})
    );
}

const setStatus = async (id, status) => {
    const hotshot = await Hotshot.findById(id);

    hotshot.status = status;

    await hotshot.save();
}

export const acceptHotshot = async (req,res) => {
    try {
        const {ID} = req.body;

        if(!ID) return res.status(400).json(new ErrorResponse('Invalid ID provided.'));
    
        await setStatus(ID, "active");
    
        res.status(200).json({
            msg: "Hotshot activated."
        });
    } catch (err) {
        res.status(500).json(new ErrorResponse("Server error."));
    }
}


export const rejectHotshot = async (req,res) => {
    try {
        const {ID} = req.body;

        if(!ID) return res.status(400).json(new ErrorResponse('Invalid ID provided.'));

        await setStatus(ID, "archived");

        res.status(200).json({
            msg: "Hotshot set to pending."
        });
    } catch (err) {
        res.status(500).json(new ErrorResponse("Server error."));
    }
}