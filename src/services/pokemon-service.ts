import axios from 'axios';
import {Pagination, PokemonListItem} from "@/typing";

type GetPokemons = Pagination<PokemonListItem>;

export async function getPokemons(): Promise<GetPokemons> {
    const result = await axios.get<GetPokemons>('https://pokeapi.co/api/v2/pokemon');
    return result.data;
}