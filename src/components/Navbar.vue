<template>
  <nav>
    <v-toolbar app>
      <!-- <v-toolbar-side-icon class="grey--text" @click="drawer =!drawer"></v-toolbar-side-icon> -->
      <v-toolbar-side-icon class="grey--text" @click="espandeBarra"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">bolota</span>
        <span>share</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat color="grey" @click="logout">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app class="indigo">
      <v-list>
        <v-list-tile v-for="url in urlList" :key="url.id" router :to="url.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{url.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{url.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <SearchDialog/>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import SearchDialog from './SearchDialog';
export default {
  components: {
    SearchDialog
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      urlList: [
        {
          id: 1,
          name: 'Trending Movies',
          icon: 'new_releases',
          route: '/trendingMovies'
        },
        {
          id: 2,
          name: 'Top Movies',
          icon: 'movie',
          route: '/topMovies'
        },
        {
          id: 3,
          name: 'Top Series',
          icon: 'thumb_up',
          route: '/topSeries'
        },
        // {
        //   id: 4,
        //   name: "Trending All",
        //   icon: "trending_up",
        //   route: "/trendingAll"
        // },
        {
          id: 5,
          name: 'Popular Series',
          icon: 'tv',
          route: '/popularSeries'
        }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('@bolotashare:username');
      localStorage.removeItem('@bolotashare:token');
      this.$router.push({ name: 'signin' });
    },
    espandeBarra() {
      this.verificaLogin();
    },
    verificaLogin() {
      const token = localStorage.getItem('@bolotashare:token');
      console.log(token);
      if (token) {
        this.drawer = !this.drawer;
      }
    }
  }
};
6;
</script>

