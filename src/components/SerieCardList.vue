<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="film in filmList" :key="film.id">
        <card v-bind:film="film"></card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SerieCard from "@/components/SerieCard";
export default {
  props: ["filmList"],
  components: {
    card: SerieCard
  }
};
</script>

<style>
</style>

