import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import log from '../../Shared/Helpers/log.js';

export default async function (req) {
    // No files submitted.
    if(!req.files) return undefined;

    // Target submitted file with the key of file.
    const file = req.files['image'];
    if(!file) return undefined;

    const extention = path.extname(file.name).toLowerCase();

    const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".heic"
    ];

    if(!allowedExtensions.includes(extention)) {
        log({
            errorCode: 415,
            hint: "Skipping uploaded image for hotshot creation beacuse it attached unsupported file type."
        });

        return undefined;
    }

    // Create a unique filename.
    const filename = `${uuidv4()}${path.extname(file.name)}`;

    // Move file to uploads directory.
    const fileMoveError = await file.mv(path.resolve(`./uploads/hotshots/${filename}`));

    // If error with moving the image for right now it will just ignore the image.
    if(fileMoveError) {
        log({
            errorCode: 500,
            hint: "Error moving image to /uploads."
        });

        return undefined;
    }

    // Return filename to save to the Hotshot.
    return filename;
}