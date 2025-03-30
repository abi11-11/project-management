import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';  // Import AuthService
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() body) {
    const token = await this.authService.validateUser(body.username, body.password);
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
    return res.status(HttpStatus.OK).json({ token: this.jwtService.sign(token) });
  }
}
