const searchBtnRef = document.getElementById("search-btn");
const inputRef = document.getElementById("search");
inputRef.addEventListener("input", () => {
    const value = inputRef.value.trim().toLowerCase();
    searchBtnRef.disabled = value.length < 3;

    if (value.length >= 3) {
        search(value);
    }else {
        isSearchActive = false;
        lastSearchResults = [];
        renderPokemons();
    }
});
const mainRef = document.getElementById("main-container");
const footerBtnRef = document.getElementById("footer-button");
const dialogRef = document.getElementById("pokemonInfoDialog");

let currentPokemonIndex = 0;
let isSearchActive = false;
let lastSearchResults = [];



const pokemonDatas = [];
let offset = 0;


function init() {
    pokemonDatas.length = 0;
    offset = 0;
    mainRef.innerHTML = "";
    loadMorePokemons();
}

async function loadMorePokemons() {
    footerBtnRef.disabled = true;
    footerBtnRef.innerText = "Loading...";

    loadAnimation();

    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );
    const responseAsJson = await response.json();

    for (let i = 0; i < responseAsJson.results.length; i++) {
        const pokemonResponse = await fetch(responseAsJson.results[i].url);
        const pokemonJson = await pokemonResponse.json();
        pokemonDatas.push(pokemonJson);
    }

    offset += 20;
    renderPokemons();

    footerBtnRef.disabled = false;
    footerBtnRef.innerText = "Get 20 more Pokemons";
}

function renderPokemons() {
    mainRef.innerHTML = "";
    for (let i = 0; i < pokemonDatas.length; i++) {
        mainRef.innerHTML += loadPokemons(i);
    }
}

function getPokemonInfo(i) {
    dialogRef.innerHTML = "";
    dialogRef.innerHTML = loadPokemonInfo(i);
    dialogOpen("pokemonInfoDialog");
}

function search(searchValue) {
    const filteredPokemons = pokemonDatas.filter(pokemon =>pokemon.name.includes(searchValue));
    isSearchActive = true;
    lastSearchResults = filteredPokemons;
    renderFilteredPokemons(filteredPokemons);
}

function renderFilteredPokemons(list) {
    mainRef.innerHTML = "";
    if (list.length === 0) {
        mainRef.innerHTML = `<p>No Pokémon found 😒<button onclick="renderPokemons()">Back to Overview</button></p>`;
        return;
    }
    for (let i = 0; i < list.length; i++) {
        const originalIndex = pokemonDatas.indexOf(list[i]);
        mainRef.innerHTML += loadPokemons(originalIndex);
    }
}

function getPokemonTypes(i) {
    for(let index = 0; index < pokemonDatas[i].types.length; index++) {
        let firstType = pokemonDatas[i].types[index].type.name;
        let secondType = "";
        if(pokemonDatas[i].types.length>1) {
            secondType = pokemonDatas[i].types[1].type.name;
        }
        return  firstType + " " + secondType;
    }
}

function showPokemonInfo(i) {
    currentPokemonIndex = i;
    dialogRef.innerHTML = loadPokemonInfo(i);
}

function showNextPokemon() {
    if (currentPokemonIndex < pokemonDatas.length - 1) {
        currentPokemonIndex++;
        showPokemonInfo(currentPokemonIndex);
    }
}

function showPreviousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
        showPokemonInfo(currentPokemonIndex);
    }
}

function goBack() {
    if (isSearchActive) {
        renderFilteredPokemons(lastSearchResults);
    } else {
        renderPokemons();
    }
}