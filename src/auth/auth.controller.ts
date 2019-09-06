import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/auth.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
  } from '@nestjs/swagger';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}