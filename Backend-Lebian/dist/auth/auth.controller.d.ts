import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        user: {
            _id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            phone: any;
            avatar: any;
        };
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            _id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            phone: any;
            avatar: any;
        };
        accessToken: string;
    }>;
}
