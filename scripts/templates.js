function loadAnimation() {
    mainRef.innerHTML = "";
    mainRef.innerHTML = `<img class="loading" src="./assets/icons/pokemon-icon.png">`;
}

function loadPokemons(i) {
    return `
        <img class="pokemon-main-image" onclick="getPokemonInfo(${i})" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i + 1}.png">
    `;
}

function loadPokemonInfo(i) {
    return `
        <div class="infoCard">
            <button class="back-btn" onclick="init()">Back</button>

            <div class="image-shortInfo">
                <img class="pokemon-main-image"
                     src="${pokemonDatas[i].sprites.other.home.front_default}">
                <div class="short-info">
                    <h2>${pokemonDatas[i].name}</h2>
                </div>
            </div>
        </div>
    `;
}