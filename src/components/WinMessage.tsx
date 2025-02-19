import { Pokemon } from "../App";
import { formatName, getImgSrc } from "../utilities";

interface WinMessageProps {
    hintsUsed: boolean[];
    numGuesses: number;
    pokemonName: string;
}

const WinMessage = ({hintsUsed, numGuesses, pokemonName} : WinMessageProps) => {

    return (
        <div className="win-message">
            <div>Correct!</div>

            <div>
                <div className="pokemon-img">
                    <img src={getImgSrc(pokemonName)}></img>
                </div>

                <div>  
                    <div>{formatName(pokemonName)}</div>
                    <div>Number of Tries: {numGuesses}</div>
                    <div>Hints Used: {hintsUsed.filter(x => x == true).length}</div>
                </div>
            </div>
        </div>
    )
}

export default WinMessage