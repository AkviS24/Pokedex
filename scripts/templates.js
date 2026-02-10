function loadAnimation() {
    mainRef.innerHTML = "";
    mainRef.innerHTML = `<img class="loading" src="./assets/icons/pokemon-icon.png">`;
}

function loadPokemons(i) {
    return `
        <div class="dis-flex-col ${pokemonDatas[i].types[0].type.name}">
            <img class="pokemon-main-image" onclick="getPokemonInfo(${i})" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i + 1}.png">
            ${pokemonDatas[i].name}
        </div>
    `;
}

function loadPokemonInfo(i) {
    return `
        <div class="infoCard">
            <div class="image-shortInfo">
                <img class="pokemon-main-image" src="${pokemonDatas[i].sprites.other.home.front_default}">
                <div class="short-info">
                    <h2>${pokemonDatas[i].name}</h2>
                    <p>Base Experience: ${pokemonDatas[i].base_experience}</p>
                    <p>Height: ${pokemonDatas[i].height}</p>
                    <p>Weight: ${pokemonDatas[i].weight}</p>
                    <button class="back-btn" onclick="renderPokemons()">Back</button>
                </div>
            </div>
        </div>
    `;
}