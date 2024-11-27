import {getPokemons} from './pokemon-service';
import axios from 'axios';
import {vi, describe, expect, test} from 'vitest';

vi.mock('axios');

describe('getPokemons function', () => {
    test('should return pokemons data when request is successful', async () => {
        vi.spyOn(axios, "get").mockResolvedValue({
            data: {
                results: [
                    {name: 'Bulbasaur', type: 'Grass/Poison'},
                    {name: 'Ivysaur', type: 'Grass/Poison'},
                ],
            },
        });

        const response = await getPokemons();

        expect(axios.get).toHaveBeenCalled();
        expect(response.results.length).toBe(2);
    });

    test('should throw error when request fails', async () => {
        vi.spyOn(axios, "get").mockRejectedValue(new Error('Network error'));

        try {
            await getPokemons();
        } catch (e) {
            expect(e).toEqual(new Error('Network error'));
        }
    });
});
