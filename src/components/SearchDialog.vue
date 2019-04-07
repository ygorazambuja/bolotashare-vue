<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-list-tile v-on="on" dark>
        <v-list-tile-action>
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content class="white--text">Search</v-list-tile-content>
      </v-list-tile>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Content Search</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Movie or Series or Whateaver" v-model="searched"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="searchContent">Search</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      dialog: false,
      searched: ""
    };
  },
  methods: {
    searchContent: function() {
      const content = this.searched;
      this.dialog = false;
      this.$router.push({ name: "resultPage", params: { content: content } });
    }
  }
};
</script>
