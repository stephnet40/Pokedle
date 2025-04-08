import { Pokemon } from "./App"

interface getCorrectPokemonProps {
    allPokemon: Pokemon[],
    generateCorrectPokemon: any
}

export const getCorrectPokemon = ({allPokemon, generateCorrectPokemon: generateCorrectPokemon} : getCorrectPokemonProps) => {
    
    const pokeId = Math.floor(Math.random() * (151 - 1)) + 1;
    
    const pokemon = allPokemon.find(x => x.id == pokeId)!;

    generateCorrectPokemon(pokemon);
}

export const getImgSrc = (id: number) => {
  return `sprites/${id}.png`;
}

export const formatName = (name: string) => {
  name = name.split(" ").map(x => x.replace(/^./, char => char.toUpperCase())).join(" ")
  name = name.replace(/\-f$|\-m$/, char => char == "-f" ? " ♀" : " ♂");
  return name;
}

export const formatTypes = (type: string) => {
  return type.replace(/^./, char => char.toUpperCase());
}

export const formatColors = (colors: string[]) => {
  return colors.map(x => x.replace(/^./, char => char.toUpperCase())).join(", ");
}

export const formatHeight = (height: number) => {
  const heightArr = height.toFixed(2).toString().split('.');
  return `${heightArr[0]}'${heightArr[1]}"`
}

export const formatWeight = (weight: number) => {
  return `${weight.toFixed(1)} lbs`
}

export const compareColor = (colors: string[], correctColors: string[]) => {
  let matching: string[] = [];

  colors.forEach(color => {
    if (correctColors.includes(color)) matching.push(color);
  })

  if (matching.length == 0) return "wrong";
  if (matching.length == correctColors.length) return "correct";
  return "partial";
}

export const compareSize = (size: number, correctSize: number) => {
  if (size > correctSize) return "⟱";
  return "⟰"
}