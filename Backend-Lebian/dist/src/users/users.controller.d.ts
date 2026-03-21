import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updatePassword(req: any, body: any): Promise<{
        message: string;
    }>;
    updateProfile(req: any, body: any): Promise<import("./schemas/user.schema").UserDocument>;
}
