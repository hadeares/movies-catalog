// movies.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(movieData: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieRepository.preload({
      id: id,
      ...updateMovieDto,
    });
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
  async replace(id: number, movieData: UpdateMovieDto): Promise<Movie> {
    let movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
        throw new Error('Filme não encontrado'); 
    }
    movie = this.movieRepository.create({ ...movie, ...movieData }); 
    return this.movieRepository.save(movie);
}
}
