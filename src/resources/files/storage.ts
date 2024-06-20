import multer, { diskStorage } from "multer";
import * as fs from 'fs-extra';

const generateId = () => {
    return Math.random().toString(36).substring(2);
}

const normalizeFilename = (req, file, callback) => {
    const extFilename = file.originalname.split('.').pop();

    const originalName = file.originalname.split('.').slice(0, -1).join('.');

    callback(null, `${generateId()}-${originalName}.${extFilename}`)
}

export const fileStorage = diskStorage({
    // destination: './uploads',
    filename: normalizeFilename
})
