<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-list rounded dark>
        <v-list-item v-on="on">
          <v-list-item-action>
            <v-icon class="white--text">search</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text">Search</v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Content Search</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field label="Name !" v-model="searched"></v-text-field>
            </v-flex>
            <v-radio-group v-model="row" row>
              <v-radio label="Filme" value="radio-1"></v-radio>
              <v-radio label="Serie" value="radio-2"></v-radio>
            </v-radio-group>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" @click="searchMovieContent">Search</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      searched: "",
      radioFilme: false,
      radioSerie: false,
      row: null
    };
  },
  methods: {
    searchMovieContent() {
      const content = this.searched;
      this.dialog = false;
      if (this.row === "radio-1") {
        this.$router.push({ name: "resultMoviePage", params: { content } });
      } else {
        this.$router.push({ name: "resultTvPage", params: { content } });
      }
    }
  }
};
</script>
