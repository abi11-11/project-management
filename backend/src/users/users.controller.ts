import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ Get the current logged-in user (Protected)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user; // Returns authenticated user's info (id, username, role)
  }

  // ✅ Get all users (Only for admins)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(@Request() req) {
    if (req.user.role !== 'admin') {
      return { message: 'Access denied. Admins only.' };
    }
    return this.usersService.findAll();
  }

  // ✅ Get a user by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string; role?: string }) {
    return this.usersService.createUser(body.username, body.password, body.role);
  }
}
