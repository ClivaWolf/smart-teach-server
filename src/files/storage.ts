import { diskStorage } from "multer";

const generateId = () => {
    return Math.random().toString(36).substring(2);
}

const normalizeFilename = (req, file, callback) => {
    const extFilename = file.originalname.split('.').pop();

    callback(null, `${generateId()}.${extFilename}`)
}

export const fileStorage = diskStorage({
    destination: './uploads',
    filename: normalizeFilename
})