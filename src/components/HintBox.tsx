import { useEffect, useState } from "react";
import { Pokemon } from "../App";
import HintDetails from "./HintDetails";

interface HintBoxProps {
    numGuesses: number;
    correctPokemon: Pokemon;
    hintsUsed: boolean[];
    updateHintsUsed: any;
}

const HintBox = ({numGuesses, correctPokemon, hintsUsed, updateHintsUsed} : HintBoxProps) => {

    const [showHint, setShowHint] = useState<boolean>(false);
    const [hintType, setHintType] = useState<string>("ability");
    const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);

    useEffect(() => {
        switch (numGuesses) {
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
      }, [numGuesses]);
    
    const getNextHintUnlock = () => {
        if (hintsUnlocked == 2) return 10 - numGuesses;
        if (hintsUnlocked == 1) return 7 - numGuesses;
        return 4 - numGuesses;
    }

    const getUsedHints = (hintNum: number) => {
        if (!hintsUsed[hintNum]) {
          const updateHints = hintsUsed;
          updateHints[hintNum] = true;
          updateHintsUsed(updateHints);
        }
      }

    return (
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
                disabled={numGuesses < 4}
              >
                {numGuesses < 4 ? "Hint 1" : "Ability"}
              </button>
              {/* Pokedex Description */}
              <button 
                onClick={() => {
                  setShowHint(showHint && hintType != "dex" ? true : !showHint); 
                  setHintType("dex");
                  getUsedHints(1);
                }}
                disabled={numGuesses < 7}
              >
                {numGuesses < 7 ? "Hint 2" : "Dex Entry"}
              </button>
              {/* Blurry Silhouette */}
              <button 
                onClick={() => {
                  setShowHint(showHint && hintType != "silhouette" ? true : !showHint); 
                  setHintType("silhouette");
                  getUsedHints(2);
                }}
                disabled={numGuesses < 10}
              >
                {numGuesses < 10 ? "Hint 3" : "Silhouette"}
              </button>
            </div>
            <HintDetails 
                isOpen={showHint}
                hintType={hintType}
                pokemon={correctPokemon!}
            />
        </div>
    )
}

export default HintBox