<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="film in cardList" :key="film.id">
        <v-card class="text-xs-center ma-2" @click="goTo">
          <v-responsive class="pt-4">
            <v-img :src="imgUrl + film.poster_path" />
          </v-responsive>
          <v-card-text>
            <div class="subheading pink--text">{{film.title}}</div>
            <div>{{film.overview}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from "../configs/config";
import axios from "axios";
// import CardList from "../components/CardList";
export default {
  components: {
    // card: CardList
  },
  data() {
    return {
      imgUrl: config.IMAGE_BASE_URL,
      cardList: [],
      searchField: ""
    };
  },
  methods: {
    loadContent() {
      this.searchField = this.$route.params.content;
      axios
        .get(
          `${config.MULTI_SEARCH}?query=${this.searchField}&api_key=ab319f50a3792c49e23a3336df9f0d80`
        )
        .then(response => {
          console.log(response.data.results);
          this.cardList.push(...response.data.results);
          this.input = "";
        })
        .catch(e => console.log(e));
    },

    //TODO
    // Pesquisar como pegar o objeto inteiro de dentro do card
    goTo() {}
  },
  mounted() {
    this.loadContent();
  }
};
</script>

<style>
</style>