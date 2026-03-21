import { Model } from 'mongoose';
import { ReportDocument } from '../reports/schemas/report.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
export declare class AdminService {
    private reportModel;
    private userModel;
    constructor(reportModel: Model<ReportDocument>, userModel: Model<UserDocument>);
    getStats(): Promise<{
        totalReports: number;
        totalUsers: number;
        byStatus: any;
        byCategory: any;
    }>;
    getUsers(): Promise<any[]>;
    updateUserRole(id: string, role: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateUser(id: string, updateData: any): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    removeUser(id: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    cleanupUsers(): Promise<import("mongodb").DeleteResult>;
}
