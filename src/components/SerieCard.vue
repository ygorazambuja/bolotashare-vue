<template>
  <v-card class="text-xs-center ma-2" flat>
    <v-responsive class="pt-4">
      <v-img :src="imgUrl + film.poster_path"/>
    </v-responsive>
    <v-card-text>
      <div class="subheading pink--text">{{film.title}}</div>
      <div>{{film.overview}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="pink" dark block @click="goTo">
        <v-icon large left>add_to_queue</v-icon>
        <span>Film Page</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Config from '../configs/config';
export default {
  props: ['film'],
  data () {
    return {
      imgUrl: Config.IMAGE_BASE_URL
    };
  },
  methods: {
    goTo () {
      this.$router.push({ name: 'seriePage', params: { id: this.film.id } });
    }
  }
};
</script>
