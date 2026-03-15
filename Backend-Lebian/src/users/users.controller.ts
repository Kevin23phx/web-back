import { Controller, Put, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('profile/password')
  @ApiOperation({ summary: 'Update user password' })
  async updatePassword(@Request() req, @Body() body: any) {
    await this.usersService.updatePassword(
      req.user.userId,
      body.currentPassword,
      body.newPassword,
    );
    return { message: 'Password updated successfully' };
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(@Request() req, @Body() body: any) {
    return this.usersService.update(req.user.userId, body);
  }
}
