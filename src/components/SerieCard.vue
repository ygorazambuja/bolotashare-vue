<template>
  <v-card class="text-xs-center ma-2" @click="goTo">
    <v-responsive class="pt-4">
      <v-img :src="imgUrl + film.poster_path" />
    </v-responsive>
    <v-card-text>
      <div class="subheading pink--text">{{film.title}}</div>
      <div>{{film.overview}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import Config from "../configs/config";
export default {
  props: ["film"],
  data() {
    return {
      imgUrl: Config.IMAGE_BASE_URL
    };
  },
  methods: {
    goTo() {
      this.$router.push({ name: "seriePage", params: { id: this.film.id } });
    }
  }
};
</script>
