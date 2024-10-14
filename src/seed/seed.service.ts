import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { HttpService } from '@nestjs/axios';
import { PokeResponse } from './interfaces/poke-response';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpService: AxiosAdapter,
  ) {}
  async executeSeed() {
    try {
      const data = await this.httpService.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=10',
      );
      const dtas = data.results.map((e) => {
        const segments = e.url.split('/');
        const no: string = segments[segments.length - 2];
        console.log(`name ${e.name} no: ${no}`);
        return { name: e.name, no: Number(no) };
      });
      /* const pokemonArray: { name: string; no: number }[] = [];

      for (const element of dtas) {
        
        pokemonArray.push(element);
      } */
      const resp = await this.pokemonModel.insertMany(dtas);
      if (resp === null) {
        throw new NotFoundException(`campos repetidos`);
      }

      return dtas;
    } catch (error) {
      throw new NotFoundException(`campos repetidos`);
    }
  }
}
