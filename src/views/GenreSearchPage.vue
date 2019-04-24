<template>
  <v-app>
    <card v-bind:filmList="filmList"></card>
  </v-app>
</template>

<script>
import axios from "axios";
import config from "../configs/config";
import CardList from "../components/CardList";

export default {
  components: {
    card: CardList
  },
  data() {
    return {
      filmList: [],
      genreId: this.$route.params.id
    };
  },
  methods: {
    loadContent() {
      axios.get(`${config.GENRE_SEARCH + this.genreId}`).then(result => {
        this.filmList = result.data.results;
      });
    }
  },
  mounted() {
    this.loadContent();
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      location.reload();
    }
  }
};
</script>
