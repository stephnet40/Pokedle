import data from "../data/abilities.json";
import { Pokemon } from "../App";
import { getImgSrc } from "../utilities";

interface HintDetailsProps {
    isOpen: boolean;
    hintType: string;
    pokemon: Pokemon;
}

const HintDetails = ({isOpen, hintType, pokemon} : HintDetailsProps) => {

    const allAbilities = data.abilities;

    const formatAbilityName = (name: string) => {
        return name.split('-').map(x => x.replace(/^./, char => char.toUpperCase())).join(" ");
    }

    const displayHint = (type: string) => {
        if (pokemon) {
            switch (type) {
                case "ability":
                    const ability = allAbilities.find(x => x.name == pokemon.ability)!;
                    return (
                        <div className={hintType}>
                            <div>{formatAbilityName(ability.name)}</div>
                            <div>{ability.description}</div>
                        </div>
                    )
                case "dex":
                    return (
                        <div className={hintType}>
                            {pokemon.dex}
                        </div>
                    )
                case "silhouette":
                    const imgSrc = getImgSrc(pokemon.id);
                    return (
                        <div className={hintType}>
                            <img src={imgSrc}></img>
                        </div>
                    )
            }
        }
    }

    return (
            <div className={isOpen ? "show-hint" : "hide"}>
                {displayHint(hintType)}
            </div>
    )
}

export default HintDetails