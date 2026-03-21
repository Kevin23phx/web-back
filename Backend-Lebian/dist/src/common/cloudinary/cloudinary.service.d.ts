import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadBase64(base64String: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
