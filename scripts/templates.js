function loadAnimation() {
    mainRef.innerHTML = "";
    mainRef.innerHTML = `<img class="loading" src="./assets/icons/pokemon-icon.png">`;
}

function loadPokemons(i) {
    return `
        <img class="pokemon-main-image" onclick="getPokemonInfo(${i})" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i}.png">
    `;
}