import gen1 from '../data/gen1.json';
import gen2 from '../data/gen2.json';
import gen3 from '../data/gen3.json';
import gen4 from '../data/gen4.json';
import gen5 from '../data/gen5.json';
import gen6 from '../data/gen6.json';
import gen7 from '../data/gen7.json';
import gen8 from '../data/gen8.json';
import gen9 from '../data/gen9.json';

interface GenerationSelectProps {
    selectedGens: boolean[];
    updateSelectedGens: (data: any) => void;
    updateAllPokemon: (data: any) => void;
    generateCorrectPokemon: (data: any) => void;
}

const GenerationSelect = ({selectedGens, updateSelectedGens, updateAllPokemon, generateCorrectPokemon} : GenerationSelectProps) => {

    const genList = ["gen1", "gen2", "gen3", "gen4", "gen5", "gen6", "gen7", "gen8", "gen9"];

    const selectGens = (index: number) => {
        selectedGens[index] = !selectedGens[index];
        updateSelectedGens(selectedGens);
    }

    const displayGens = () => {
        let gens: any[] = [];

        genList.forEach((gen, ind) => {
            const imgSrc = `generations/${gen}.png`
            gens.push(
                <button key={`${gen}-btn`} onClick={() => selectGens(ind)}>
                    <img className={!selectedGens[ind] ? 'not-selected' : ''} src={imgSrc}></img>
                </button>
            )
        })

        return gens;
    }

    const startNewGame = () => {
        getAllPokemon();
    }

    const getAllPokemon = () => {
        const pokemonList = [];

        if (selectedGens[0]) {
            pokemonList.push(gen1.pokemon);
        }

        if (selectedGens[1]) {
            pokemonList.push(gen2.pokemon);
        }

        if (selectedGens[2]) {
            pokemonList.push(gen3.pokemon);
        }

        if (selectedGens[3]) {
            pokemonList.push(gen4.pokemon);
        }

        if (selectedGens[4]) {
            pokemonList.push(gen5.pokemon);
        }

        if (selectedGens[5]) {
            pokemonList.push(gen6.pokemon);
        }

        if (selectedGens[6]) {
            pokemonList.push(gen7.pokemon);
        }

        if (selectedGens[7]) {
            pokemonList.push(gen8.pokemon);
        }

        if (selectedGens[8]) {
            pokemonList.push(gen9.pokemon);
        }

        updateAllPokemon(pokemonList.flat());
    }

    return (
        <div>
            
            <div>Select Generations</div>

            <div className="gen-select">
                {displayGens()}
            </div>

            <div>
                <button onClick={() => startNewGame()}>New Game</button>
            </div>

        </div>
    )
}

export default GenerationSelect