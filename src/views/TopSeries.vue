<template>
  <v-app>
    <h4 class="grey--text">{{msg}}</h4>
    <card v-bind:filmList="filmList"></card>
  </v-app>
</template>

<script>
import axios from "axios";
import config from "../configs/config";
import CardList from "../components/CardList";
export default {
  name: "TopSeries",
  components: {
    card: CardList
  },
  data: function() {
    return {
      msg: "Top Series",
      filmList: [],
      imgUrl: config.IMAGE_BASE_URL,
      loading: true
    };
  },
  mounted: function() {
    this.verifyLogin();
  },
  methods: {
    loadContent: function() {
      axios.get(`${config.TOP_SERIES_URL + config.API_KEY}`).then(result => {
        this.filmList = result.data.results;
        this.loading = false;
      });
    },
    verifyLogin: function() {
      const username = localStorage.getItem("@bolotashare:username");
      const token = localStorage.getItem("@bolotashare:token");

      if (!username || !token) this.$router.push({ name: "signin" });
    }
  },
  mounted: function() {
    this.verifyLogin();
    this.loadContent();
  }
};
</script>
