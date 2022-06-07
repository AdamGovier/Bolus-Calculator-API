import fs from 'fs';

export default async function(req, res) {
    const path = `./uploads/hotshots/${req.params.image}`;

    try {
        if (fs.existsSync(path)) {
            res.status(200).sendFile(path, { root: '.' });
        } else {
            res.status(404).sendFile("./uploads/no-image.webp", { root: '.' });
        }
    } catch(err) {
        res.status(500).sendFile("./uploads/no-image.webp", { root: '.' });
    }
}