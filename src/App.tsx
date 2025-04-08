import data from './data/gen1.json'
import './App.css'
import { useEffect, useState } from 'react';
import { compareColor, compareSize, formatColors, formatHeight, formatName, formatTypes, formatWeight, getCorrectPokemon as getCorrectPokemon, getImgSrc } from './utilities';
import WinMessage from './components/WinMessage';
import GenerationSelect from './components/GenerationSelect';
import HintBox from './components/HintBox';

export interface Pokemon {
  id: number,
  name: string,
  type1: string,
  type2: string,
  evolutionStage: number,
  fullyEvolved: boolean,
  color: string[],
  height: number,
  weight: number,
  ability: string,
  dex: string
}

function App() {

  const [selectedGens, setSelectedGens] = useState<boolean[]>(new Array(9).fill(true));
  const updateSelectedGens = (data: any) => {
    setSelectedGens([...data]);
  }

  const [allPokemon, setAllPokemon] = useState<Pokemon[]>(data.pokemon);
  const updateAllPokemon = (data: any) => {
    setAllPokemon(data);
  }
  const [correctPokemon, setCorrectPokemon] = useState<Pokemon>(data.pokemon[0]);
  const generateCorrectPokemon = (data: any) => {
    setCorrectPokemon(data);
  }
  
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [currGuess, setCurrGuess] = useState<Pokemon>();
  const [guesses, setGuesses] = useState<Pokemon[]>([]);
  const [hintsUsed, setHintsUsed] = useState<boolean[]>(new Array(3).fill(false));
  const updateHintsUsed = (hints: any) => {
    setHintsUsed(hints);
  }

  useEffect(() => {
    getCorrectPokemon({allPokemon, generateCorrectPokemon: generateCorrectPokemon});
  }, []);
  
  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      const searchLength = searchTerm.length;
      const filteredResults = allPokemon.filter(pokemon => [...pokemon.name].slice(0, searchLength).join('') == searchTerm.toLowerCase());
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }

  const clueLabels = ["Pokémon", "Type 1", "Type 2", "Evolution Stage", "Fully Evolved", "Color", "Height", "Weight"];

  const handleInputChange = (event: any) => {
    setSearchInput(event.target.value);
    handleSearch(event.target.value);
  }

  const selectPokemon = (pokemon: Pokemon) => {
    let currList = guesses;
    currList.unshift(pokemon);
    setGuesses(currList);
    setCurrGuess(pokemon);

    let currPokemon = allPokemon;
    currPokemon.splice(currPokemon.indexOf(pokemon), 1);
    setAllPokemon(currPokemon);

    setSearchInput('');
    setSearchResults([]);
  } 
  
  return (
    <>
      <div>
        <div className='header'>
          <h1>Pokédle</h1>
          <h2>A Wordle-inspired Pokemon Guessing Game</h2>
        </div>

        <GenerationSelect 
          selectedGens={selectedGens}
          updateSelectedGens={updateSelectedGens}
          updateAllPokemon={updateAllPokemon}
          generateCorrectPokemon={generateCorrectPokemon}
        />
        
        <div className={currGuess == correctPokemon ? 'hide' : ''}> 
          <HintBox 
            numGuesses={guesses.length}
            correctPokemon={correctPokemon}
            hintsUsed={hintsUsed}
            updateHintsUsed={updateHintsUsed}
          />
          
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
        </div>

        <div className={currGuess == correctPokemon ? '' : 'hide'}>
          <WinMessage 
            hintsUsed={hintsUsed} 
            numGuesses={guesses.length}
            pokemonId={correctPokemon!.id} 
            pokemonName={correctPokemon!.name} 
          />
        </div>

        <div className='guess-list'>
          <div className='clue-labels'>
            {guesses.length ? clueLabels.map((clue, index) => <div key={`${index}-${clue}`} className='label'>{clue}</div>) : <div></div>}
          </div>
          <div>
            {guesses.map((pokemon, index) => 
              <div key={`${index}-${pokemon}`} className='pokemon-clues'>
                <div key={`${index}-${pokemon}-name`} className='pokemon-img'>
                  <img src={getImgSrc(pokemon.id)}></img>
                </div>
                <div key={`${index}-${pokemon}-type1`}
                    className={pokemon.type1 == correctPokemon?.type1 ? 'correct' : 'wrong'}
                >
                  {formatTypes(pokemon.type1)}
                </div>
                <div key={`${index}-${pokemon}-type2`}
                    className={pokemon.type2 == correctPokemon?.type2 ? 'correct' : 'wrong'}
                >
                  {pokemon.type2 ? formatTypes(pokemon.type2) : "None"}
                </div>
                <div key={`${index}-${pokemon}-evolution-stage`}
                    className={pokemon.evolutionStage == correctPokemon?.evolutionStage ? 'correct' : 'wrong'}
                >
                  {pokemon.evolutionStage}
                </div>
                <div key={`${index}-${pokemon}-fully-evolved`}
                    className={pokemon.fullyEvolved == correctPokemon?.fullyEvolved ? 'correct' : 'wrong'}
                >
                  {pokemon.fullyEvolved ? "Yes" : "No"}
                </div>
                <div key={`${index}-${pokemon}-color`}
                    className={compareColor(pokemon.color, correctPokemon!.color)}
                >
                  {formatColors(pokemon.color)}
                </div>
                <div key={`${index}-${pokemon}-height`}
                    className={pokemon.height == correctPokemon?.height ? 'correct' : 'wrong'}
                >
                  {formatHeight(pokemon.height)}
                  {pokemon.height != correctPokemon!.height ? compareSize(pokemon.height, correctPokemon!.height) : ''}
                </div>
                <div key={`${index}-${pokemon}-weight`}
                    className={pokemon.weight == correctPokemon?.weight ? 'correct' : 'wrong'}
                >
                  {formatWeight(pokemon.weight)}
                  {pokemon.weight != correctPokemon!.weight ? compareSize(pokemon.weight, correctPokemon!.weight) : ''}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
