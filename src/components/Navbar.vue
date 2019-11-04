<template>
  <v-container>
    <v-app-bar color="indigo" dark app>
      <v-app-bar-nav-icon class="white--text" @click="espandeBarra"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight">bolota</span>
        <span>share</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <SearchComponent></SearchComponent>
      <v-spacer></v-spacer>

      <v-btn color="red" @click="logout">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="indigo">
      <v-list rounded dark nav>
        <v-subheader class="white--text">Most Acessed</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="url in urlList" :key="url.id" router :to="url.route">
            <v-list-item-icon>
              <v-icon class="white--text">{{url.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="white--text">{{url.name}}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <SearchDialog />

      <v-list rounded dark>
        <v-subheader class="white--text">Genres List</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="genre in genreList" :key="genre.id" router :to="genre.url">
            <v-list-item-icon>
              <v-icon>{{genre.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="white--text">{{genre.name}}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import SearchDialog from "./SearchDialog";
import GenreList from "../configs/genreList";
import SearchComponent from "./SearchComponent";
export default {
  components: {
    SearchDialog,
    SearchComponent
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      genreList: GenreList,
      collapseOnScroll: true,

      urlList: [
        {
          id: 1,
          name: "Trending Movies",
          icon: "new_releases",
          route: "/trendingMovies"
        },
        {
          id: 2,
          name: "Top Movies",
          icon: "movie",
          route: "/topMovies"
        },
        {
          id: 3,
          name: "Top Series",
          icon: "thumb_up",
          route: "/topSeries"
        },
        {
          id: 4,
          name: "Popular Series",
          icon: "tv",
          route: "/popularSeries"
        }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("@bolotashare:username");
      localStorage.removeItem("@bolotashare:token");
      this.$router.push({ name: "signin" });
    },
    espandeBarra() {
      this.verificaLogin();
    },
    verificaLogin() {
      const token = localStorage.getItem("@bolotashare:token");
      if (token) {
        this.drawer = !this.drawer;
      }
    }
  },
  mounted() {}
};
</script>

