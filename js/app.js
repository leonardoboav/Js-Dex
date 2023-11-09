//Declaração de variáveis
const conteiner = document.querySelector("#conteiner");
const pokeCount = 151 //range do número total a ser mostrado pela API
const cores = {
    fire: '#C72200',
    grass: '#389A02',
    water: '#0C66C0',
    electric: '#F9B514',
    ground: '#C9A84D',
    rock: '#9E863D',
    fairy: '#E08EE0',
    poison: '#622165',
    bug: '#86950C',
    dragon: '#745DDD',
    psychic: '#E0376D',
    flying: '#9baaec',
    fighting: '#7A301A',
    ghost: '#4A4A97',
    steel: '#8F8E9F',
    ice: '#6DD2F7',
    dark: '#3E2E21',
    shadow: '#5517AA',
    normal: '#c7bfae',
    unknown: '#00000'
}

//Cria um array com todos os tipos extraídos do "cores" 
const mainTypes = Object.keys(cores);

//Recupera os dados utilizando o getPokemon
const fetchPokemons = async () => {
    for (let i = 1; i <= pokeCount; i++) { //Usa o loop para iterar pelos IDs 
        await getPokemon(i)
    }
}

//Coleta dados individuais da API
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    pokeCard(data)
    //console.log(data.types[0].type.name);
    //console.log(data)
}

//Recebe o objeto Poke como parametro e retorna o HTML do card
const pokeCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    //Pega o ID e converte para string de 3 dígitos (#000)
    const name = poke.name[0].toUpperCase() + poke.name.slice(1) //1ª Letra maiúscula
    const id = poke.id.toString().padStart(3, '0')

    const pokeTipos = poke.types.map(type => type.type.name) //Coleta tipos e coloca no array
    const type = mainTypes.find(type => pokeTipos.indexOf(type) > -1) //Tipo principal
    const cor = cores[type] //Obtém a cor utilizando o objeto cores

    card.style.backgroundColor = cor //Define a cor de fundo do card

    //Cria uma string HTML que contém o conteúdo do cartão
    const pokeHTML = `
    <div class="imagem">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="numero">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
`
    card.innerHTML = pokeHTML //Define o conteúdo HTML como string
    
    conteiner.appendChild(card) //Adiciona o cartão ao HTML, adiciona o obj filho ao pai.
}

//Solicitação HTTP ao servidor (API)
fetchPokemons()
