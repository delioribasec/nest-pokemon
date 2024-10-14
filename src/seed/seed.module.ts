import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, pokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    HttpModule,
    PokemonModule,
    CommonModule
  ],
  controllers: [SeedController],
  providers: [SeedService, PokemonService],
})
export class SeedModule {}
