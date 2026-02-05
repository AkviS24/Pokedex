const inputRef = document.getElementById("search");
const mainRef = document.getElementById("main-container");


const pokemons = [];
const pokemonDatas = [];
let offset = 0;


function init() {
    
    getPokemons();
}

async function getPokemons() {
    loadAnimation();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const responseAsJson = await response.json();
    pokemons.push(responseAsJson);
    for(let i = 0; i < pokemons[0].results.length; i++){
        const response = await fetch(pokemons[0].results[0].url);
        const responseAsJson = await response.json();
        pokemonDatas.push(responseAsJson);
    }
 
    mainRef.innerHTML = "";
    loadAnimation();
   
    renderPokemons();
}

function renderPokemons() {
    mainRef.innerHTML = "";
    for(let i = 0; i < pokemonDatas.length; i++) {
        console.log(pokemonDatas[i].sprites.other.home.front_default);
        mainRef.innerHTML += loadPokemons(i);
    }
}