import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Movie } from './movie.entity';


@ApiTags('Filmes') // Etiqueta API para agrupamento
@ApiBearerAuth() // Anotação Swagger para autenticação Bearer
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Cria um novo filme' })
    @ApiBody({ type: CreateMovieDto, description: 'Dados para criação de um novo filme' })
    @ApiResponse({ status: 201, description: 'Filme criado com sucesso', type: Movie })
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }
    

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Obtém todos os filmes' })
    findAll() {
        return this.moviesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({ name: 'id', type: 'string', description: 'ID do filme' })
    @ApiOperation({ summary: 'Obtém um filme pelo ID' })
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiParam({ name: 'id', type: 'string', description: 'ID do filme para atualização' })
    @ApiOperation({ summary: 'Atualiza um filme pelo ID' })
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(+id, updateMovieDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiParam({ name: 'id', type: 'string', description: 'ID do filme para remoção' })
    @ApiOperation({ summary: 'Deleta um filme pelo ID' })
    remove(@Param('id') id: string) {
        return this.moviesService.remove(+id);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiParam({ name: 'id', type: 'string', description: 'ID do filme para atualização completa' })
    @ApiOperation({ summary: 'Substitui um filme pelo ID' })
    @ApiBody({ type: UpdateMovieDto, description: 'Dados para atualização completa do filme' })
    @ApiResponse({ status: 200, description: 'Filme atualizado com sucesso', type: Movie })
    replace(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.replace(+id, updateMovieDto);
    }
    
}
