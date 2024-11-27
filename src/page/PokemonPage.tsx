import {Box, Button, Grid2, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "@/store";
import {useCallback} from "react";
import {fetchPokemons} from "@/store/slice/pokemon-slice";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {PokemonListItem} from "@/typing";

const columns: GridColDef<PokemonListItem>[] = [{
    field: "name",
    headerName: "Nome",
    flex: 1
}, {
    field: "url",
    headerName: "URL",
    flex: 2
}]

export function PokemonPage() {
    const dispatch = useAppDispatch();
    const {datasource, loading, error} = useAppSelector(state => state.pokemon);

    const refresh = useCallback(() => {
        dispatch(fetchPokemons());
    }, [dispatch])

    if (error) {
        return <Typography variant="body2" color="textSecondary">{error}</Typography>
    }

    return <Box>
        <Grid2 container spacing={2}>
            <Grid2>
                <Button data-testid={"btn-refresh"} onClick={refresh}>
                    Refresh
                </Button>
            </Grid2>
            <Grid2 size={12}>
                <DataGrid
                    loading={loading}
                    getRowId={row => row.name}
                    rows={datasource}
                    columns={columns}
                />
            </Grid2>
        </Grid2>
    </Box>
}