import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, pokemonSchema } from './entities/pokemon.entity';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  exports:[PokemonService,MongooseModule],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: pokemonSchema,
      },
    ]),
  ],
})
export class PokemonModule {

  constructor(private readonly configService:ConfigService){

    console.log(process.env.DEFAULT_LIMIT)
    console.log(this.configService.get<string>('defaultLimit'))
  }
}
