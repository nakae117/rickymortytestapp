<template>
	<div class="main">
		<v-container fluid>
			<v-row class="baner" justify="center" align="center">
				<v-col class="text-center" cols="12" sm="12" md="12">
					<img
						src="/logo.png"
						alt="Rick & Morty"
						:height='($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) ? "120px" : (($vuetify.breakpoint.md) ? "150px" :"180px")'
					>
					<v-row justify="center" align="center">
						<v-col cols="12" sm="6" md="6">
							<v-text-field
								v-model="consulta.name"
								outlined
								solo
								label="Buscar personaje"
								prepend-inner-icon="mdi-magnify"
								@keydown="delayBuscar"
								dense
								color="#11555f"
							></v-text-field>
						</v-col>
					</v-row>

					<v-row justify="center" align="center">
						<v-col cols="6" sm="4" md="2">
							<v-select
								v-model="consulta.status"
								:items="status"
								label="Status"
								outlined
								solo
								dense
								@change="buscar"
							></v-select>
						</v-col>

						<v-col cols="6" sm="4" md="2">
							<v-select
								v-model="consulta.gender"
								:items="generos"
								label="Gender"
								outlined
								solo
								dense
								@change="buscar"
							></v-select>
						</v-col>
					</v-row>
				</v-col>
				
				<v-app-bar
				>
					<v-toolbar-title v-text="title" />
				</v-app-bar>
			</v-row>
		</v-container>

		<v-container>
			<v-overlay :value="cargando">
				<v-progress-circular
					indeterminate
					size="64"
				></v-progress-circular>
			</v-overlay>

			<v-row>
				<v-col class="text-center py-16 my-16" cols="12" sm="12" md="12" v-if="personajes.length === 0">
					<h4 class="text-h4">
						Uh-oh!
					</h4>

					<p class="subtitle-1">
						¡Pareces perdido en tu viaje!
					</p>

					<v-btn class="white--text" color="#11555f" rounded @click="resetearBuscador">
						Eliminar filtros
					</v-btn>
				</v-col>

				<v-col cols="12" sm="12" md="12">
					<v-row>
						<v-col cols="12" sm="4" md="4" v-for="(personaje, i) in personajes" :key="'personaje-' + i">
							<ficha-personaje :personaje="personaje"/>
						</v-col>
					</v-row>
				</v-col>

				<v-col cols="12" sm="12" md="12" v-if="personajes.length > 0">
					<v-pagination
						v-model="consulta.page"
						:length="info.pages"
						prev-icon="mdi-menu-left"
						next-icon="mdi-menu-right"
						@input="buscar"
					></v-pagination>
				</v-col>
				
				<NuxtChild :key="$route.fullPath"/>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import FichaPersonaje from '~/components/FichaPersonaje'

export default {
	name: 'buscar',
	components: {
		FichaPersonaje
	},
	data: () => ({
		title: 'Rick & Morty - App',
		cargando: false,
		time: null,
		status: ['alive', 'dead', 'unknown'],
		generos: ['female', 'male', 'genderless', 'unknown'],
		consulta: {
			page: 1,
			name: '',
			status: '',
			gender: '',
		}
	}),
	mounted(){
		this.consulta.page = this.$route.query.pagina ? parseInt(this.$route.query.pagina) : 1;
		this.consulta.name = this.$route.query.nombre ? this.$route.query.nombre : '';
		this.consulta.status = this.$route.query.status ? this.$route.query.status : '';
		this.consulta.gender = this.$route.query.gender ? this.$route.query.gender : '';
		this.buscar()
	},
	computed: {
		personajes() {
			return this.$store.state.buscador.lista
		},
		info() {
			return this.$store.state.buscador.info
		}
	},
	methods: {
		buscar(){
			this.cargando = true
			if(this.$route.name === 'buscar'){
				this.$router.push({path: this.$route.path, query: {
					pagina: this.consulta.page,
					nombre: this.consulta.name,
					status: this.consulta.status,
					gender: this.consulta.gender
				}})
			}
			this.$store.dispatch('buscador/obtenerPersonajes', this.consulta).then(() => {
				if(this.$route.name === 'buscar'){
					this.$store.commit('buscador/establecerUrl', this.$route.fullPath)
				}
				this.cargando = false
			}).catch(() => {
				this.cargando = false
			})
		},
		delayBuscar(){
			clearTimeout(this.time)
			this.time = setTimeout(() => {
				this.consulta.page = 1,
				this.buscar()
			}, 300);
		},
		resetearBuscador(){
			this.consulta.page = 1,
			this.consulta.name = ''
			this.consulta.status = ''
			this.consulta.gender = ''
			this.buscar()
		}
	}
}
</script>

<style scoped>
.baner {
	background-image: url('/bg.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>