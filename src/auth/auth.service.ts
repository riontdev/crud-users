import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/auth.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async createToken(jwtPayload : JwtPayload) {
    const user = await this.userService.findByEmail(jwtPayload.email);
    if (!user && user.password === jwtPayload.password) {
        return new BadRequestException()
    }
    const payload = { username: user.email, roles: user.roles };
    const expiresIn = 3600;

    return this.jwtService.sign(payload, {expiresIn});
  }

  async createUserAndToken(jwtPayload : JwtPayload) {
    let user = await this.userService.findByEmail(jwtPayload.email);
    if (!user) {
       user = await this.userService.create(jwtPayload); 
    } else {
      return new BadRequestException();
    }
    const payload = { username: user.email, roles: user.roles };
    const expiresIn = 3600;
    return this.jwtService.sign(payload, {expiresIn});
  }

  async validateToken(token : any) {
    return await this.jwtService.verify(token);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findByEmail(payload.email);
    if (user && user.password === payload.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}