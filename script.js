const pokeContainer = document.querySelector("#pokeContainer")
const pokeCount = 151
const colors= {
    grass: '#9bcc50',
    poison: '#b97fc9',
    fire: '#fd7d24',
    psychic: '#f366b9',
    ghost: '#7b62a3',
    water: '#4592c4',
    bug: '#729f3f',
    ground: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);',
    normal: '#a4acaf',
    flying: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);',
    electric: '#eed535',
    fairy: '#fdb9e9',
    fighting: '#d56723',
    rock: '#a38c21',
    steel: '#9eb7b8',
    ice: '#51c4e7',
    dragon: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);'

}
const pokeTypes = Object.keys(colors);
console.log(pokeTypes)
const fetchPokemons = async () =>{
    for(let i = 1; i <= pokeCount; i++){
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokeCard(data)
}

const createPokeCard = (poke) => {
    const card = document.createElement('div')
    let typeColor = []
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.substring(1)
    const id = poke.id
    const showId = ('000' + id).slice(-3);

    const types = poke.types.map(types => types.type.name) /* Tipos do pokemon */

    types.forEach(type => {
        typeColor.push( colors[type] )
    })

    /*const type = pokeTypes.find(type => types.indexOf(type) > -1) /* Encontrar cor do tipo principal */

    /*card.style.backgroundColor = typeColor*/ /*Muda a cor do card*/

    let cardTypes = []
    types.forEach(type => {
        /*console.log(typeColor[types.indexOf(type)])*/
        cardTypes.push(`<small class="pokeType" style="background: ${typeColor[types.indexOf(type)]}">${type}</small>`)
    })

    let pokemonInnerHTML = `
        <div class="pokeShowOff">
            <figure class="pokeBackground">
                <img src="assets/pokeballBG.png" alt="Pokebola">
            </figure>

            <div class="pokeImage">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
            </div>
        </div>

        <div class="pokeInfo">
            <span class="pokeNumber">#${showId}</span>
            <h1 class="pokeName">${name}</h1> 
            ${cardTypes.join('')}
        </div>
    `

    card.innerHTML = pokemonInnerHTML
    pokeContainer.appendChild(card)
}

fetchPokemons()