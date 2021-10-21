export const state = () => ({
	lista: [],
})

export const actions = {
	obtenerEpisodios({ commit }, consulta) {
		return new Promise((resolve, reject) => {
			this.$axios.$get('https://rickandmortyapi.com/api/episode/' + consulta)
				.then((res) => {
					let lista = res;

					if (res.error) {
						commit('establecerLista', [])
						resolve([])
					} else {
						commit('establecerLista', lista)
						resolve(lista)
					}
				}).catch((error) => {
					commit('establecerLista', [])
					reject(error)
				})
		})
	},
}

export const mutations = {
	establecerLista(state, lista) {
		state.lista = lista
	},
}
