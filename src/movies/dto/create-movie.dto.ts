import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'O Senhor dos Anéis: A Sociedade do Anel', description: 'O título do filme' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @ApiProperty({ example: 'Peter Jackson', description: 'O diretor do filme' })
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty({ example: 'O Senhor dos Anéis: A Sociedade do Anel é o primeiro filme da trilogia que adapta a obra de J. R. R. Tolkien....', description: 'Descrição do filme' })
  @IsString()
  description: string;
}
