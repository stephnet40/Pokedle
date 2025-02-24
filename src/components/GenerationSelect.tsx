interface GenerationSelectProps {
    selectedGens: boolean[];
    updateSelectedGens: (data: any) => void;
}

const GenerationSelect = ({selectedGens, updateSelectedGens} : GenerationSelectProps) => {

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

    return (
        <div className="gen-select">
            {displayGens()}
        </div>
    )
}

export default GenerationSelect