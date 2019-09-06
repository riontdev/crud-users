import { Controller, Get, UseGuards, Request, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';


const url = 'user';
@Controller('user')
@ApiUseTags('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Find All users with paginate' })
    @Roles('admin')
    findAll(@Request() req, @Query('page') page: number = 0, @Query('limit') limit: number = 10) {
    // this route is restricted by AuthGuard
    // JWT strategy
    limit = limit > 100 ? 100 : limit;
    let fullUrl = req.protocol + '://' + req.get('host') + '/' + url;
    return this.userService.findByAll({page, limit, route: fullUrl,});
  }
}
