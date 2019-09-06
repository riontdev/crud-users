import { IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class JwtPayload {

    @ApiModelProperty()
    @IsEmail()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;
}