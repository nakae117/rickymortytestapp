<template>
	<v-card :to="'/buscar/personaje/' + personaje.id">
	<!-- <v-card :to="{ name: 'personaje', params: { _id: personaje.id } }"> -->
		<div class="d-flex flex-no-wrap">
			<v-avatar
				class="rounded-l-sm"
				size="125"
				tile
			>
				<v-img :src="personaje.image"></v-img>
			</v-avatar>

			<div>
				<v-card-subtitle class="py-0 pt-3 text--subtitle grey--text lighten-1--text">{{ personaje.status }} - {{ personaje.species }}</v-card-subtitle>
				<v-card-subtitle class="py-0 text--title" v-text="personaje.name"></v-card-subtitle>
				<v-card-subtitle class="py-0 pt-3 text--subtitle grey--text lighten-1--text">{{ personaje.location.name }}</v-card-subtitle>
				<v-card-subtitle class="py-0 text--title">{{ personaje.location.name }}</v-card-subtitle>
			</div>
		</div>
	</v-card>
</template>

<script>
export default {
	props: ['personaje']
}
</script>

<style scoped>
.text--title {
	font-size: 14px;
}

.text--subtitle {
	font-size: 11px;
}
</style>