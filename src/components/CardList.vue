<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="film in filmList" :key="film.id">
        <v-card class="text-xs-center ma-2" flat>
          <v-responsive class="pt-4">
            <v-img :src="imgUrl + film.poster_path"/>
          </v-responsive>
          <v-card-text>
            <div class="subheading pink--text">{{film.title}}</div>
            <div>{{film.overview}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="pink" dark block>
              <v-icon large left>add_to_queue</v-icon>
              <span>Film Page</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Config from "../configs/config";
export default {
  props: ["filmList"],
  data: function() {
    return {
      imgUrl: Config.IMAGE_BASE_URL
    };
  }
};
</script>

<style>
</style>

