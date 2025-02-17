import data from "../data/abilities.json";
import { Pokemon } from "../App";
import { getImgSrc } from "../utilities";

interface HintsModalProps {
    isOpen: boolean;
    hintType: string;
    pokemon: Pokemon;
}

const Hints = ({isOpen, hintType, pokemon} : HintsModalProps) => {

    const allAbilities = data.abilities;

    const displayHint = (type: string) => {
        if (pokemon) {
            switch (type) {
                case "ability":
                    const ability = allAbilities.find(x => x.name == pokemon.ability)!;
                    return (
                        <div>
                            <div>{ability.name}</div>
                            <div>{ability.description}</div>
                        </div>
                    )
                case "dex":
                    return (
                        <div>
                            {pokemon.dex}
                        </div>
                    )
                case "silhouette":
                    const imgSrc = getImgSrc(pokemon.name);
                    return (
                        <div className="silhouette">
                            <img src={imgSrc}></img>
                        </div>
                    )
            }
        }
    }

    return (
            <div className={isOpen ? "show-hint" : "hide-hint"}>
                {displayHint(hintType)}
            </div>
    )
}

export default Hints