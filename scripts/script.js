const inputRef = document.getElementById("search");
const mainRef = document.getElementById("main-container");


const pokemons = [];


function init() {
    loadAnimation();
}

function loadAnimation() {
    mainRef.innerHTML = "";
    mainRef.innerHTML = `<img class="loading" src="./assets/icons/pokemon-icon.png">`;
}