import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto): Promise<any> {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new BadRequestException(
          `error in db ${JSON.stringify(error.errmsg)}`,
        );
      }
      throw new InternalServerErrorException(`no pudo crear pokemon`);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    
    const { limit, offset } = paginationDto;
    
    return this.pokemonModel.find().limit(limit===undefined?Number(process.env.DEFAULT_LIMIT):limit).skip(offset).sort({no:1}).select('-__v');
  }

  async findOne(name: string) {
    const pokemon: Pokemon = await this.pokemonModel.findOne({ name: name });
    console.log('pokemon: ' + pokemon);
    if (!pokemon) {
      throw new NotFoundException(`no se encontro pokemmon con ese id`);
    }
    return pokemon;
  }

  update(name: number, updatePokemonDto: UpdatePokemonDto) {
    try {
      return this.pokemonModel
        .findOneAndUpdate({ no: name }, updatePokemonDto, { new: true })
        .exec();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  remove(name: string) {
    return this.pokemonModel.findOneAndDelete({ name: name }).exec();
  }
}
