<template>
	<v-row justify="center" align="center">
		<v-col class="baner text-center pt-10" cols="12" sm="12" md="12">
			<img
				src="/logo.png"
				alt="Rick y Morty"
				height="300px"
			>
			<br>
			<h1 class="white--text mb-5">Bienvenido a Rick y Morty</h1>
			<v-btn color="primary" to="/buscar">
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
	backdrop-filter: brightness(50%);
	height: 100vh;
	
}
</style>