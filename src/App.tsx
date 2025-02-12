import data from './pokemon.json'
import './App.css'
import { useState } from 'react';

interface Pokemon {
  id: number,
  name: string,
  type1: string,
  type2: string,
  evolutionStage: number,
  fullyEvolved: boolean,
  color: string[],
  height: number,
  weight: number
}

function App() {

  const [allPokemon, setAllPokemon] = useState<Pokemon[]>(data.pokemon);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [guesses, setGuesses] = useState<Pokemon[]>([]);

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
    currList.push(pokemon);
    currList = currList.reverse();
    setGuesses(currList);

    let currPokemon = allPokemon;
    currPokemon.splice(currPokemon.indexOf(pokemon), 1);
    setAllPokemon(currPokemon);

    setSearchInput('');
    setSearchResults([]);
  } 

  const formatHeight = (height: number) => {
    const heightArr = height.toFixed(2).toString().split('.');
    return `${heightArr[0]}'${heightArr[1]}"`
  }

  const formatWeight = (weight: number) => {
    return `${weight.toFixed(1)} lbs`
  }
  
  return (
    <>
      <div>
        <div>
          <input type='text' placeholder='Search' value={searchInput} onChange={handleInputChange}></input>
          <ul>
            {searchResults.map((result, index) => 
              <li key={index}>
                <button key={`${index}-btn`} onClick={() => selectPokemon(result)}>{result.name}</button>
              </li>)}
          </ul>
        </div>

        <div>
          {guesses.map((pokemon, index) => 
            <div key={`${index}-${pokemon}`} className='pokemon-clues'>
              <div key={`${index}-${pokemon}-name`}>{pokemon.name}</div>
              <div key={`${index}-${pokemon}-type1`}>{pokemon.type1}</div>
              <div key={`${index}-${pokemon}-type2`}>{pokemon.type2}</div>
              <div key={`${index}-${pokemon}-evolution-stage`}>{pokemon.evolutionStage}</div>
              <div key={`${index}-${pokemon}-fully-evolved`}>{pokemon.fullyEvolved}</div>
              <div key={`${index}-${pokemon}-color`}>{pokemon.color}</div>
              <div key={`${index}-${pokemon}-height`}>{formatHeight(pokemon.height)}</div>
              <div key={`${index}-${pokemon}-weight`}>{formatWeight(pokemon.weight)}</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
