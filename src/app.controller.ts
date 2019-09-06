import { Controller, Get, UseGuards, Body, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtPayload } from './auth/dto/auth.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
  } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ title: 'Login' })
  async signIn(@Body() jwtPayload : JwtPayload): Promise<any> {
    return await this.authService.createToken(jwtPayload);
  }

  @Post('signup')
  @ApiOperation({ title: 'Register' })
  async signUp(@Body() jwtPayload : JwtPayload): Promise<any> {
    return await this.authService.createUserAndToken(jwtPayload);
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req) {
    // this route is restricted by AuthGuard
    // JWT strategy
    return req.user;
  }
}
