import { formatName, getImgSrc } from "../utilities";

interface WinMessageProps {
    hintsUsed: boolean[];
    numGuesses: number;
    pokemonId: number;
    pokemonName: string;
}

const WinMessage = ({hintsUsed, numGuesses, pokemonId, pokemonName} : WinMessageProps) => {

    return (
        <div className="win-message">
            <div>Correct!</div>

            <div>
                <div className="pokemon-img">
                    <img src={getImgSrc(pokemonId)}></img>
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