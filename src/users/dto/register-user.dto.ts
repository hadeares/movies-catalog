// src/users/dto/register-user.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'usuario123', description: 'Nome de usuário único' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário', minLength: 6 })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
