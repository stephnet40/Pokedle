import { Pokemon } from "./App"

interface getDailyPokemonProps {
    allPokemon: Pokemon[],
    generateDailyPokemon: any
}

export const getDailyPokemon = ({allPokemon, generateDailyPokemon} : getDailyPokemonProps) => {
    
    const pokeId = Math.floor(Math.random() * (151 - 1)) + 1;
    
    const pokemon = allPokemon.find(x => x.id == pokeId)!;

    generateDailyPokemon(pokemon);
}