import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
        totalReports: number;
        totalUsers: number;
        byStatus: any;
        byCategory: any;
    }>;
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateUserRole(id: string, role: string): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
