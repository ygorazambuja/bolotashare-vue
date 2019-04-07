<template>
  <div>
    <h1 class="grey--text">{{msg}}</h1>
    <card v-bind:filmList="filmList"></card>
  </div>
</template>

<script>
import axios from "axios";
import config from "../configs/config";
import CardList from "../components/CardList";
export default {
  name: "TrendingAll",
  components: {
    card: CardList
  },
  data: function() {
    return {
      msg: "Top Trending",
      filmList: [],
      imgUrl: config.IMAGE_BASE_URL,
      loading: true
    };
  },
  methods: {
    loadContent: function() {
      axios.get(`${config.TRENDING_ALL + config.API_KEY}`).then(result => {
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
