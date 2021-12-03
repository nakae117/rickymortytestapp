<template>
	<v-row class="baner" justify="center" align="center">
		<v-col class="text-center pt-10" cols="12" sm="12" md="12">
			<img
				src="/logo.png"
				alt="Rick y Morty"
				:height='($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) ? "120px" : (($vuetify.breakpoint.md) ? "200px" :"300px")'
			>
			<br>
			
			<h1 class="white--text mb-5">Bienvenido a Rick y Morty</h1>
			<v-btn style="background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%); color: #fff;" to="/buscar">
				Continuar
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
export default {
	layout: 'landing',
	data () {
		return {
			title: 'Rick & Morty - App'
		}
	}
}
</script>

<style scoped>
.baner {
	background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('/bg.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	backdrop-filter: brightness(50%);
	height: 100vh;
	
}
</style>