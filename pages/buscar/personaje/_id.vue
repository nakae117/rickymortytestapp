<template>
	<div>
		<v-row justify="space-around">
			<v-overlay :value="cargando">
				<v-progress-circular
					indeterminate
					size="64"
				></v-progress-circular>
			</v-overlay>

			<v-col cols="auto">
				<v-dialog
					transition="dialog-bottom-transition"
					max-width="800"
					v-model="dialog"
					persistent
				>
					<template>
						<v-card v-if="notFound">
							<v-app-bar flat>
								<v-spacer></v-spacer>

								<v-btn
									icon
									:to="url"
								>
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-app-bar>

							<v-card-text>
								<v-row>
									<v-col class="text-center mt-5" cols="12" sm="12" md="12">
										<div>Personaje no encontrado</div>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>

						<v-card v-if="!notFound && personaje">
							<v-img id="ficha" height="200px" src="/ficha.jpg">
								<v-app-bar flat color="rgba(0, 0, 0, 0)">
									<v-spacer></v-spacer>

									<v-btn
										color="white"
										icon
										:to="url"
									>
										<v-icon>mdi-close</v-icon>
									</v-btn>
								</v-app-bar>

								<v-card-title class="white--text mt-8">
									<v-avatar size="80">
										<img alt="user" :src="personaje.image" >
									</v-avatar>
								</v-card-title>
							</v-img>

							<v-card-text>
								<v-row>
									<v-col class="text-center mt-5" cols="12" sm="12" md="12">
										<div v-text="personaje.status"></div>
										<div v-text="personaje.name"></div>
										<div v-text="personaje.species"></div>
									</v-col>

									<v-col class="" cols="12" sm="12" md="12">
										<h3 class="grey--text lighten-1--text mb-4">Información</h3>
										<v-row>
											<v-col cols="4" sm="4" md="4">
												<v-text-field
													label="Gender"
													:value="personaje.gender ? personaje.gender : ''"
													outlined
													readonly
													dense
												></v-text-field>
											</v-col>

											<v-col cols="4" sm="4" md="4">
												<v-text-field
													label="Origin"
													:value="personaje.origin ? personaje.origin.name : ''"
													outlined
													readonly
													dense
												></v-text-field>
											</v-col>

											<v-col cols="4" sm="4" md="4">
												<v-text-field
													label="Type"
													:value="personaje.personaje ? personaje.type : ''"
													outlined
													readonly
													dense
												></v-text-field>
											</v-col>
										</v-row>
									<hr>
									</v-col>

									<v-col class="" cols="12" sm="12" md="12">
										<h3 class="grey--text lighten-1--text mb-4">Episodios</h3>
										<span v-if="cargandoEpisodios">Cargando episodios</span>

										<v-row v-if="!cargandoEpisodios && episodios.id">
											<v-col cols="4" sm="4" md="4">
												<v-text-field
													:label="episodios.name ? episodios.name : ''"
													:value="episodios.episode ? episodios.episode : ''"
													:hint="episodios.air_date ? episodios.air_date : ''"
													persistent-hint
													outlined
													readonly
													dense
												></v-text-field>
											</v-col>
										</v-row>

										<v-row v-if="!cargandoEpisodios && episodios.length > 1">
											<v-col cols="4" sm="4" md="4" v-for="(episodio, i) in episodios" :key="'episodio-' + i">
												<v-text-field
													:label="episodio.name ? episodio.name : ''"
													:value="episodio.episode ? episodio.episode : ''"
													:hint="episodio.air_date ? episodio.air_date : ''"
													persistent-hint
													outlined
													readonly
													dense
												></v-text-field>
											</v-col>
										</v-row>
										<hr>
									</v-col>

									<v-col cols="12" sm="12" md="12">
										<h3 class="grey--text lighten-1--text mb-4">Personajes interesantes</h3>
										<span v-if="cargandoPersonajes">Cargando personajes</span>
										<v-row>
											<v-col cols="12" sm="6" md="6" v-for="(personaje, i) in personajesInteresantes" :key="'personajeI-' + i">
												<ficha-personaje :personaje="personaje"/>
											</v-col>
										</v-row>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</template>
				</v-dialog>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'personaje',
	data: () => ({
		dialog: false,
		cargando: false,
		cargandoEpisodios: false,
		cargandoPersonajes: false,
		notFound: false
	}),
	mounted(){
		this.$root.$emit('layout_loaded', true);
		this.cargando = true
		this.$store.dispatch('buscador/obtenerPersonaje', this.$route.params.id).then(() => {
			this.cargando = false
			this.dialog = true

			this.cargandoEpisodios = true

			this.$store.dispatch('episodios/obtenerEpisodios', this.episodiosKeys).then(() => {
				this.cargandoEpisodios = false
			}).catch(() => {
				this.cargandoEpisodios = false
			})

			this.cargandoPersonajes = true

			this.$store.dispatch('buscador/obtenerTresPersonajes').then(() => {
				this.cargandoPersonajes = false
			}).catch(() => {
				this.cargandoPersonajes = false
			})
			
		}).catch(() => {
			this.cargando = false
			this.dialog = true
			this.notFound = true
		})
	},
	computed: {
		url(){
			return this.$store.state.buscador.url
		},
		personaje(){
			return this.$store.state.buscador.personaje
		},
		personajesInteresantes(){
			return this.$store.state.buscador.personajesInteresantes
		},
		episodios(){
			return this.$store.state.episodios.lista
		},
		episodiosKeys(){
			let episodios = [];

			if(this.personaje){
				this.personaje.episode.forEach(function (element, key) {
					let ids = element.split('/');
					episodios.push(ids[5])
				})
				
			}

			return episodios.join(',')
		}
	}
}
</script>

<style scoped>
img {
	border: 3px solid #fff;
}
.v-card__text {
	height: calc(90vh - 200px);
	overflow-y: auto;
}
</style>

<style>
#ficha .v-image__image--cover{
	filter: brightness(50%);
}
</style>