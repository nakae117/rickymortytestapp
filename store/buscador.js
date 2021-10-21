export const state = () => ({
	lista: [],
	info: {},
	url: '/buscar',
	personaje: {},
	personajesInteresantes: [],
})

export const actions = {
	obtenerPersonajes({ commit }, consulta){
		return new Promise((resolve, reject) => {
			this.$axios.$get('https://rickandmortyapi.com/api/character/', { params: consulta })
				.then((res) => {
					let lista = res.results,
						info = res.info;
					
					if(res.error){
						commit('establecerLista', [])
						commit('establecerInfo', {})
						resolve([])
					} else {
						commit('establecerLista', lista)
						commit('establecerInfo', info)
						resolve(lista)
					}
				}).catch((error) => {
					commit('establecerLista', [])
					commit('establecerInfo', {})
					reject(error)
				})
		})
	},
	obtenerTresPersonajes({ commit }, consulta){
		return new Promise((resolve, reject) => {
			let personaje1 = Math.floor(Math.random() * 672),
				personaje2 = Math.floor(Math.random() * 672),
				personaje3 = Math.floor(Math.random() * 672);

			this.$axios.$get('https://rickandmortyapi.com/api/character/' + personaje1 + ',' + personaje2 + ',' + personaje3)
				.then((res) => {
					let lista = res;
					
					if(res.error){
						commit('establecerListaInteresante', [])
						resolve([])
					} else {
						commit('establecerListaInteresante', lista)
						resolve(lista)
					}
				}).catch((error) => {
					commit('establecerListaInteresante', [])
					reject(error)
				})
		})
	},
	obtenerPersonaje({ commit }, consulta){
		return new Promise((resolve, reject) => {
			this.$axios.$get('https://rickandmortyapi.com/api/character/' + consulta)
				.then((res) => {
					let personaje = res;
					
					if(res.error){
						commit('establecerPersonaje', {})
						resolve([])
					} else {
						commit('establecerPersonaje', personaje)
						resolve(personaje)
					}
				}).catch((error) => {
					commit('establecerPersonaje', {})
					reject(error)
				})
		})
	}
}

export const mutations = {
	establecerLista(state, lista) {
		state.lista = lista
	},
	establecerListaInteresante(state, personajesInteresantes) {
		state.personajesInteresantes = personajesInteresantes
	},
	establecerInfo(state, info) {
		state.info = info
	},
	establecerUrl(state, url) {
		state.url = url
	},
	establecerPersonaje(state, personaje) {
		state.personaje = personaje
	}
}
