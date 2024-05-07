import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiPropertyOptional({ example: 'Inception', description: 'O título do filme' })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  title?: string;

  @ApiPropertyOptional({ example: 'Peter Jackson', description: 'O diretor do filme' })
  @IsString()
  @IsOptional()
  director?: string;

  @ApiPropertyOptional({ example: 'O Senhor dos Anéis: A Sociedade do Anel é o primeiro filme da trilogia que adapta a obra de J. R. R. Tolkien....', description: 'Descrição do filme' })
  @IsString()
  @IsOptional()
  description?: string;
}
