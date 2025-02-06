import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../utils' // didn't specify /index.js cuz any file called 'index' is the default export from a folder

export default function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon, handleToggleMenu, showSideMenu } = props;
    const [searchValue, setSearchValue] = useState('');

    const filteredPokemonList = first151Pokemon.filter((value, index) => {
        // if the full pokedex number includes the current search value, then return true and keep the value in the array
        if (getFullPokedexNumber(index).includes(searchValue)) return true;

        // if the pokemon name includes the current search value, return true and keep it on the array
        if (value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) return true;

        // otherwise, exclude value from the array
        return false;
    })

    return (
        <nav className={' ' + (showSideMenu ? " open" : '')}>
            <div className={"header " + (showSideMenu ? " open" : '')} >
                <button onClick={handleToggleMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input placeholder="E.g. 001 or Bulba..." value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }} />
            {filteredPokemonList.map((pokemon, pokemonIndex) => {
                const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                return (
                    <button onClick={() => {
                        setSelectedPokemon(truePokedexNumber)
                        handleToggleMenu()
                    }} key={pokemonIndex} className={'nav-card ' + (pokemonIndex === selectedPokemon ? ' nav-card-selected' : ' ')}>
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}