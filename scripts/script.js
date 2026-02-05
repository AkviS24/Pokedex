const searchBtnRef = document.getElementById("search-btn");
const inputRef = document.getElementById("search");
inputRef.addEventListener("input", () => {
    const value = inputRef.value.trim();
    searchBtnRef.disabled = value.length < 3;
});
const mainRef = document.getElementById("main-container");
const footerBtnRef = document.getElementById("footer-button");


const pokemons = [];
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
    mainRef.innerHTML = "";
    mainRef.innerHTML = loadPokemonInfo(i);
}

function search() {
    const searchValue = inputRef.value.trim().toLowerCase();

    if (searchValue.length < 3) return;

    const filteredPokemons = pokemonDatas.filter(pokemon =>
        pokemon.name.includes(searchValue)
    );

    renderFilteredPokemons(filteredPokemons);
}

function renderFilteredPokemons(list) {
    mainRef.innerHTML = "";

    if (list.length === 0) {
        mainRef.innerHTML = "<p>No Pokémon found 😢</p>";
        return;
    }

    for (let i = 0; i < list.length; i++) {
        const originalIndex = pokemonDatas.indexOf(list[i]);
        mainRef.innerHTML += loadPokemons(originalIndex);
    }
}