import {describe, expect, test, vi} from "vitest";
import * as services from "@/services";
import {configureStore} from "@reduxjs/toolkit";
import slice, {fetchPokemons, clearPokemons} from "./pokemon-slice";

vi.mock("@/services");

describe("Pokemon Slice", () => {
    const store = configureStore({
        reducer: {
            [slice.name]: slice.reducer
        }
    });

    const mockData = {
        "count": 1302,
        "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        "previous": null, results: [{
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },]
    };

    test("dispatch fetchPokemons action success", async () => {
        vi.spyOn(services, "getPokemons").mockResolvedValue(mockData);

        store.dispatch(fetchPokemons());

        expect(store.getState().pokemon.loading).eq(true);

        await vi.waitFor(() => {
            expect(store.getState().pokemon.loading).eq(false);
        });

        expect(store.getState().pokemon.datasource).eq(mockData.results);
        expect(store.getState().pokemon.error).toBeUndefined();

        store.dispatch(clearPokemons());

        expect(store.getState().pokemon.datasource).toHaveLength(0);
    });

    test("dispatch fetchPokemons action with error", async () => {
        vi.spyOn(services, "getPokemons").mockRejectedValue(new Error('Network error'));

        store.dispatch(fetchPokemons());

        expect(store.getState().pokemon.loading).eq(true);

        await vi.waitFor(() => {
            expect(store.getState().pokemon.loading).eq(false);
        });

        expect(store.getState().pokemon.datasource).toHaveLength(0);
        expect(store.getState().pokemon.error).eq('Network error');
    });
})