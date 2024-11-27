import {PokemonPage} from "@/page/PokemonPage.tsx";
import {Provider} from "react-redux";
import {store} from "@/store";

function App() {
    return <Provider store={store}>
        <PokemonPage/>
    </Provider>
}

export default App
