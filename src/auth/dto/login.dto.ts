import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username', example: '' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password', example: '' })
  @IsString()
  password: string;
}
