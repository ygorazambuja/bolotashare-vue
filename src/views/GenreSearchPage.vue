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
  data () {
    return {
      filmList: [],
      genreId: this.$route.params.id,
      page: 1
    };
  },
  methods: {
    loadContent (page) {
      axios
        .get(`${config.GENRE_SEARCH + this.genreId + config.PAGE + page}`)
        .then(result => {
          this.filmList.push(...result.data.results);
          this.page++;
        });
    },
    endPage () {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loadContent(this.page);
        }
      };
    }
  },
  mounted () {
    this.loadContent(this.page);
    this.endPage();
  },
  watch: {
    $route () {
      this.id = this.$route.params.id;
      location.reload();
    }
  }
};
</script>
