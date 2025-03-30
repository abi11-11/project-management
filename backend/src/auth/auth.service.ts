import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users = [
    { id: 1, username: 'admin', password: '$2b$12$jFoJwU4442txqtid1iK3zudL2f/3hV.1vlGiQIGUN.HWtmZ1QrZVS', role: 'admin' },
    { id: 2, username: 'viewer', password: '$2b$12$OLTNLRf8f9CUpg48BcOu.O2jHP/6W40a6fVYR1p0mk/Go2KXKT.6a', role: 'viewer' },
  ];

  async validateUser(username: string, password: string) {
    console.log(username,password, this.users);
    const user = this.users.find(user => user.username === username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return { id: user.id, username: user.username, role: user.role };
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role, sub: user.id };
    console.log(this.jwtService.sign(payload))
    return { token: this.jwtService.sign(payload) };
  } 
}
