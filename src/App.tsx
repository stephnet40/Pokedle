import data from './pokemon.json'
import './App.css'
import { useEffect, useState } from 'react';
import { getDailyPokemon } from './utilities';

export interface Pokemon {
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
  const [dailyPokemon, setDailyPokemon] = useState<Pokemon>();
  const generateDailyPokemon = (data: any) => {
    setDailyPokemon(data);
  }

  useEffect(() => {
    getDailyPokemon({allPokemon, generateDailyPokemon});
  }, []);

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [currGuess, setCurrGuess] = useState<Pokemon>();
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
    currList.unshift(pokemon);
    setGuesses(currList);
    setCurrGuess(pokemon);

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

  const formatName = (name: string) => {
    name = name.split(" ").map(x => x.replace(/^./, char => char.toUpperCase())).join(" ")
    name = name.replace(/\-f$|\-m$/, char => char == "-f" ? " ♀" : " ♂");
    return name;
  }

  const formatTypes = (type: string) => {
    return type.replace(/^./, char => char.toUpperCase());
  }

  const formatColors = (colors: string[]) => {
    return colors.map(x => x.replace(/^./, char => char.toUpperCase())).join(", ");
  }

  const formatHeight = (height: number) => {
    const heightArr = height.toFixed(2).toString().split('.');
    return `${heightArr[0]}'${heightArr[1]}"`
  }

  const formatWeight = (weight: number) => {
    return `${weight.toFixed(1)} lbs`
  }

  const compareColor = (colors: string[], correctColors: string[]) => {
    let matching: string[] = [];

    colors.forEach(color => {
      if (correctColors.includes(color)) matching.push(color);
    })

    if (matching.length == 0) return "wrong";
    if (matching.length == correctColors.length) return "correct";
    return "partial";
  }

  const compareSize = (size: number, correctSize: number) => {
    if (size > correctSize) return "⟱";
    return "⟰"
  }
  
  return (
    <>
      <div>
        <div className='header'>
          <h1>Pokédle</h1>
          <h2>A Wordle-inspired Pokemon Guessing Game</h2>
        </div>

        <div className='search'>
          <input type='text' placeholder='Search for Pokémon' value={searchInput} onChange={handleInputChange} disabled={currGuess == dailyPokemon}></input>
          <ul className='filtered-search'>
            {searchResults.map((result, index) => 
              <li key={index}>
                <button key={`${index}-btn`} onClick={() => selectPokemon(result)}>
                  <img src={getImgSrc(result.name)}></img>
                  {formatName(result.name)}
                </button>
              </li>)}
          </ul>
        </div>

        <div className='win-message'>
          {currGuess == dailyPokemon ? 
            <div>Correct!</div> :
            <div></div>
          }
        </div>

        <div className='guess-list'>
          {guesses.map((pokemon, index) => 
            <div key={`${index}-${pokemon}`} className='pokemon-clues'>
              <div key={`${index}-${pokemon}-name`} className='pokemon-img'>
                <img src={getImgSrc(pokemon.name)}></img>
              </div>
              <div key={`${index}-${pokemon}-type1`}
                   className={pokemon.type1 == dailyPokemon?.type1 ? 'correct' : 'wrong'}
              >
                {formatTypes(pokemon.type1)}
              </div>
              <div key={`${index}-${pokemon}-type2`}
                   className={pokemon.type2 == dailyPokemon?.type2 ? 'correct' : 'wrong'}
              >
                {pokemon.type2 ? formatTypes(pokemon.type2) : "None"}
              </div>
              <div key={`${index}-${pokemon}-evolution-stage`}
                   className={pokemon.evolutionStage == dailyPokemon?.evolutionStage ? 'correct' : 'wrong'}
              >
                {pokemon.evolutionStage}
              </div>
              <div key={`${index}-${pokemon}-fully-evolved`}
                  className={pokemon.fullyEvolved == dailyPokemon?.fullyEvolved ? 'correct' : 'wrong'}
              >
                {pokemon.fullyEvolved ? "Yes" : "No"}
              </div>
              <div key={`${index}-${pokemon}-color`}
                   className={compareColor(pokemon.color, dailyPokemon!.color)}
              >
                {formatColors(pokemon.color)}
              </div>
              <div key={`${index}-${pokemon}-height`}
                   className={pokemon.height == dailyPokemon?.height ? 'correct' : 'wrong'}
              >
                {formatHeight(pokemon.height)}
                {pokemon.height != dailyPokemon!.height ? compareSize(pokemon.height, dailyPokemon!.height) : ''}
              </div>
              <div key={`${index}-${pokemon}-weight`}
                   className={pokemon.weight == dailyPokemon?.weight ? 'correct' : 'wrong'}
              >
                {formatWeight(pokemon.weight)}
                {pokemon.weight != dailyPokemon!.weight ? compareSize(pokemon.weight, dailyPokemon!.weight) : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
