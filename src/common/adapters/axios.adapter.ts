import { PokeResponse } from 'src/seed/interfaces/poke-response';
import { HttpAdapter } from '../interfaces/http-adapters.interface';
import { HttpService } from '@nestjs/axios';
import axios,{AxiosInstance} from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios:AxiosInstance =axios;
  async get<PokeResponse>(url: string): Promise<PokeResponse> {
    try {
      const { data } = await this.axios.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=10',
      );
      return data;
    } catch (error) {
        throw new Error("ocurrio error"+JSON.stringify(error))
    }
  }
}
