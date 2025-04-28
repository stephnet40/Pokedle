import { useState } from "react";
import { formatName, getImgSrc } from "../utilities"
import { Pokemon } from "../App";

interface SearchProps {
    allPokemon: Pokemon[];
    correctPokemon: Pokemon;
    guesses: Pokemon[];
    currGuess: Pokemon | undefined;
    updateAllPokemon: (data: any) => void;
    updateGuesses: (data: any) => void;
    updateCurrGuess: (data: any) => void;
}

const Search = ({allPokemon, correctPokemon, guesses, currGuess, updateAllPokemon, updateGuesses, updateCurrGuess} : SearchProps) => {

    const [searchInput, setSearchInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Pokemon[]>([]);

    const handleSearch = (searchTerm: string) => {
        if (searchTerm) {
            const searchLength = searchTerm.length;
            const filteredResults = allPokemon.filter(pokemon => [...pokemon.name].slice(0, searchLength).join('') == searchTerm.toLowerCase());
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    }

    const handleInputChange = (event: any) => {
        setSearchInput(event.target.value);
        handleSearch(event.target.value);
    }

    const selectPokemon = (pokemon: Pokemon) => {
        let currList = guesses;
        currList.unshift(pokemon);
        updateGuesses(currList);
        updateCurrGuess(pokemon);

        let currPokemon = allPokemon;
        currPokemon.splice(currPokemon.indexOf(pokemon), 1);
        updateAllPokemon(currPokemon);

        setSearchInput('');
        setSearchResults([]);
    }

    return (
        <div className='search'>
            <input type='text' placeholder='Search for Pokémon' value={searchInput} onChange={handleInputChange} disabled={currGuess == correctPokemon}></input>
            <ul className='filtered-search'>
                {searchResults.map((result, index) =>
                    <li key={index}>
                        <button key={`${index}-btn`} onClick={() => selectPokemon(result)}>
                            <img src={getImgSrc(result.id)}></img>
                            {formatName(result.name)}
                        </button>
                    </li>)}
                {searchInput.length && !searchResults.length ?
                    <li className='empty-list'>
                        <button>No Pokemon found</button>
                    </li> :
                    <li></li>
                }
            </ul>
        </div>
    )
}

export default Search