<template>
  <v-dialog v-model="dialog" full-width max-width="600px" lazyl light>
    <template v-slot:activator="{ on }">
      <v-btn dark class="error" v-on="on" block>Trailer !</v-btn>
    </template>
    <iframe
      width="600"
      height="315"
      :src="YOUT_URL + filmTrailerId"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <v-btn color="blue darken-1" @click="dialogKill" block>Close</v-btn>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import config from '../configs/config';
export default {
  props: ['filmId'],
  data() {
    return {
      dialog: false,
      searched: '',
      YOUT_URL: 'https:/' + '/www.youtube.com/embed/',
      filmTrailerId: 0
    };
  },
  methods: {
    getVideos() {
      axios
        .get(
          `${`${config.MOVIE_BASE_URL + this.filmId}/videos${config.API_KEY}`}`
        )
        .then(result => {
          this.filmTrailerId = result.data.results[0].key;
        })
        .catch(err => {});
    },
    dialogKill() {
      this.dialog = false;
      this.$off();
    }
  },
  mounted() {
    this.getVideos();
  }
};
</script>
