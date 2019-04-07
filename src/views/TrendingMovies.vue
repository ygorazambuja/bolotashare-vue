<template>
  <v-app>
    <h4 class="grey--text">{{msg}}</h4>
    <card v-bind:filmList="filmList"></card>
  </v-app>
</template>

<script>
import axios from 'axios';
import config from '../configs/config';
import CardList from '../components/CardList';
export default {
  name: 'TrendingMovies',
  components: {
    card: CardList
  },
  data() {
    return {
      msg: 'Trending Movies',
      filmList: [],
      imgUrl: config.IMAGE_BASE_URL,
      loading: true
    };
  },
  mounted() {
    this.verifyLogin();
  },
  methods: {
    loadContent() {
      axios.get(`${config.TRENDING_MOVIE + config.API_KEY}`).then(result => {
        this.filmList = result.data.results;
        this.loading = false;
      });
    },
    verifyLogin() {
      const username = localStorage.getItem('@bolotashare:username');
      const token = localStorage.getItem('@bolotashare:token');

      if (!username || !token) {
        this.$router.push({ name: 'signin' });
      }
    }
  },
  mounted() {
    this.verifyLogin();
    this.loadContent();
  }
};
</script>
