<template>
  <v-app>
    <h3 class="grey--text">Searching for {{ content }}</h3>
    <card v-bind:filmList="filmList"></card>
  </v-app>
</template>


<script>
import axios from "axios";
import config from "../configs/config";
import SerieCardList from "@/components/SerieCardList";
export default {
  components: {
    card: SerieCardList
  },
  data() {
    return {
      content: "",
      imgUrl: config.IMAGE_BASE_URL,
      filmList: []
    };
  },
  created() {
    this.content = this.$route.params.content;
  },
  methods: {
    loadContent() {
      axios
        .get(
          `${config.SEARCH_SERIE +
            config.API_KEY +
            config.QUERY +
            this.content}`
        )
        .then(result => {
          this.filmList = result.data.results;
          this.loading = false;
        });
    },
    verifyLogin() {
      const username = localStorage.getItem("@bolotashare:username");
      const token = localStorage.getItem("@bolotashare:token");

      if (!username || !token) {
        this.$router.push({ name: "signin" });
      }
    }
  },
  mounted() {
    this.verifyLogin();
    this.loadContent();
  },
  watch: {
    $route(to, from) {
      this.content = this.$route.params.content;
      this.loadContent();
    }
  }
};
</script>
