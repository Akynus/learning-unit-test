import {createAppSlice} from "../createAppSlice";
import {PokemonListItem} from "@/typing";
import {getPokemons} from "@/services";

export interface PokemonState {
    loading: boolean;
    datasource: PokemonListItem[];
    error?: string;
}

const initialState: PokemonState = {
    loading: false, datasource: []
}

const pokemonSlice = createAppSlice({
    name: "pokemon",
    initialState,
    reducers: create => ({
        clearPokemons: create.reducer(state => {
            state.datasource = []
        }),
        fetchPokemons: create.asyncThunk(() => {
            return getPokemons();
        }, {
            pending: state => {
                state.loading = true;
                state.datasource = [];
                state.error = undefined;
            },
            rejected: (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            },
            fulfilled: (state, action) => {
                state.loading = false;
                state.datasource = action.payload.results;
            }
        })
    })
});

export const {clearPokemons, fetchPokemons} = pokemonSlice.actions;

export default pokemonSlice;