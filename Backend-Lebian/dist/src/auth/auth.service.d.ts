import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
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
    login(user: any): Promise<{
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
    validateUser(loginDto: LoginDto): Promise<any>;
    getProfile(userId: string): Promise<{
        user: any;
    }>;
}
