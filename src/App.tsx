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

  const getImgSrc = (name: string) => {
    if (name.includes("mime")) {
      name = name.replace(". ", "-")
    }

    if (name.includes("'d")) {
      name = name.replace("'", "")
    }

    return `sprites/${name}.png`;
  }

  const formatColors = (colors: string[]) => {
    return colors.join(", ");
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
        <div className='search'>
          <input type='text' placeholder='Search' value={searchInput} onChange={handleInputChange}></input>
          <ul className='filtered-search'>
            {searchResults.map((result, index) => 
              <li key={index}>
                <button key={`${index}-btn`} onClick={() => selectPokemon(result)}>{result.name}</button>
              </li>)}
          </ul>
        </div>

        <div className='guess-list'>
          {guesses.map((pokemon, index) => 
            <div key={`${index}-${pokemon}`} className='pokemon-clues'>
              <div key={`${index}-${pokemon}-name`}><img src={getImgSrc(pokemon.name)}></img></div>
              <div key={`${index}-${pokemon}-type1`}>{pokemon.type1}</div>
              <div key={`${index}-${pokemon}-type2`}>{pokemon.type2 ? pokemon.type2 : "None"}</div>
              <div key={`${index}-${pokemon}-evolution-stage`}>{pokemon.evolutionStage}</div>
              <div key={`${index}-${pokemon}-fully-evolved`}>{pokemon.fullyEvolved ? "Yes" : "No"}</div>
              <div key={`${index}-${pokemon}-color`}>{formatColors(pokemon.color)}</div>
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
