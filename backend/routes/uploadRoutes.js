import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');  // null(first arg) is for errors
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }
}

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), (req, res) => {
    // the actual upload is done by the 'upload' middleware, we just have to send back a response.
    res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
    });
})

export default router;