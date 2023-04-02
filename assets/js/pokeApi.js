// objeto
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    // fazendo uma equivalencia
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    // pega o primeiro elemento caso tenha
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}




// Function para os details dos pokemons
pokeApi.getDetailPokemon = (pokemon) => {
    // extraindo todos os detalhes que a url tem dos pokemons nesse fetch(pokemon.rul)
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        // convertendo a lista em json
        .then((response) => response.json()) 
        // buscando apenas o results da requisição
        .then((jsonBody) => jsonBody.results)

        // Pegando a lista de detalhes pokemons e fazendo uma nova lista já em formato JSON
        .then((pokemons) => pokemons.map(pokeApi.getDetailPokemon))

        // Passando a lista de detalhes como uma promise
        .then((detailRequests) => Promise.all(detailRequests))

        // Me retornar todos os detalhes dos pokemons que foram extraidos na url
        .then(pokemonDetailList => pokemonDetailList)
        .catch((error) => console.error(error))
}




