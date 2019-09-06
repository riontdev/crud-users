import { Injectable, Request, CacheInterceptor } from '@nestjs/common';
import { User } from './user.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../auth/dto/auth.dto';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
  
  async create(jwtPayload :JwtPayload) {
    const user = new User;
    user.email = jwtPayload.email;
    user.password = jwtPayload.password;
    user.roles = 'USER_STANDARD';
    return await this.userRepository.save(user);
  }

  async findByAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return await paginate<User>(this.userRepository, options, { roles: 'USER_STANDARD'});
  }

  async findByEmail(email : string) : Promise<User> {
    return await this.userRepository.findOne({email: email});
  }
}
