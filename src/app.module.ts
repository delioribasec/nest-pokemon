import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { appconfig } from './common/config/app.config';
import { JoiValidationSchema } from './common/config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appconfig],
      validationSchema:JoiValidationSchema
    }),
    /* ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }), */
    MongooseModule.forRoot(process.env.MONGODB,
      {
        dbName:'pokemonsdb'
      }

    ),
    PokemonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env.PORT);
  }
}
