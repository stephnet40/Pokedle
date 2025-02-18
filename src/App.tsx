import data from './data/pokemon.json'
import './App.css'
import { useEffect, useState } from 'react';
import { compareColor, compareSize, formatColors, formatHeight, formatName, formatTypes, formatWeight, getDailyPokemon, getImgSrc } from './utilities';
import HintDetails from './components/HintDetails';

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

  const [allPokemon, setAllPokemon] = useState<Pokemon[]>(data.pokemon);
  const [dailyPokemon, setDailyPokemon] = useState<Pokemon>();
  const generateDailyPokemon = (data: any) => {
    setDailyPokemon(data);
  }

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [currGuess, setCurrGuess] = useState<Pokemon>();
  const [guesses, setGuesses] = useState<Pokemon[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintType, setHintType] = useState<string>("ability");
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<boolean[]>(new Array(3).fill(false))

  useEffect(() => {
    getDailyPokemon({allPokemon, generateDailyPokemon});
  }, []);

  useEffect(() => {
    switch (guesses.length) {
      case 4:
        setHintsUnlocked(1);
        break;
      case 7:
        setHintsUnlocked(2);
        break;
      case 10:
        setHintsUnlocked(3);
        break;
      default:
        break;
    }
  }, [guesses.length]);
  
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

  const getNextHintUnlock = () => {
    if (hintsUnlocked == 2) return 10 - guesses.length;
    if (hintsUnlocked == 1) return 7 - guesses.length;
    return 4 - guesses.length;
  }

  const getUsedHints = (hintNum: number) => {
    if (!hintsUsed[hintNum]) {
      const updateHints = hintsUsed;
      updateHints[hintNum] = true;
      setHintsUsed(updateHints);
    }
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
            {searchInput.length && !searchResults.length ? 
              <li className='empty-list'>
                <button>No Pokemon found</button>
              </li> :
              <li></li>
            }
          </ul>
        </div>

        <div className='hints'>
          <div>{hintsUnlocked < 3 ? `Next hint unlocked in ${getNextHintUnlock()} guesses.` : ""}</div>
          <div className='hint-buttons'>
            {/* Ability */}
            <button 
              onClick={() => {
                setShowHint(showHint && hintType != "ability" ? true : !showHint); 
                setHintType("ability");
                getUsedHints(0);
              }} 
              disabled={guesses.length < 4}
            >
              {guesses.length < 4 ? "Hint 1" : "Ability"}
            </button>
            {/* Pokedex Description */}
            <button 
              onClick={() => {
                setShowHint(showHint && hintType != "dex" ? true : !showHint); 
                setHintType("dex");
                getUsedHints(1);
              }}
              disabled={guesses.length < 7}
            >
              {guesses.length < 7 ? "Hint 2" : "Dex Entry"}
            </button>
            {/* Blurry Silhouette */}
            <button 
              onClick={() => {
                setShowHint(showHint && hintType != "silhouette" ? true : !showHint); 
                setHintType("silhouette");
                getUsedHints(2);
              }}
              disabled={guesses.length < 10}
            >
              {guesses.length < 10 ? "Hint 3" : "Silhouette"}
            </button>
          </div>
          <HintDetails 
              isOpen={showHint}
              hintType={hintType}
              pokemon={dailyPokemon!}
          />
        </div>

        <div className='win-message'>
          {currGuess == dailyPokemon ? 
            <div>Correct!</div> :
            <div></div>
          }
        </div>

        <div className='guess-list'>
          <div className='clue-labels'>
            {guesses.length ? clueLabels.map((clue, index) => <div key={`${index}-${clue}`}>{clue}</div>) : <div></div>}
          </div>
          <div>
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
      </div>
    </>
  )
}

export default App
