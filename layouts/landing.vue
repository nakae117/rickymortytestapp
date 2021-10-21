<template>
	<v-app>
		<v-main>
			<v-container fluid>
				<Nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data () {
		return {
			title: 'Rick & Morty - App'
		}
	}
}
</script>

<style>
html {
	overflow-y: auto !important;
}
</style>