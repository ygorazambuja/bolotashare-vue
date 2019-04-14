<template>
  <v-app>
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs12 md5 style="background-color: black">
          <v-img max-heigth="300" :src="imgUrl + film.poster_path"/>
        </v-flex>
        <v-flex xs12 md5 class="ml-3">
          <h2 class="indigo--text display-3 pt-4" style="text-align: center">{{film.title }}</h2>
          <h4 class="indigo--text" style="text-align: center">{{film.tagline}}</h4>
          <v-layout row wrap justify-space-between>
            <v-flex xs12 md4 sm6>
              <div>
                <v-icon color="indigo">calendar_today</v-icon>
                <span color="indigo">{{film.release_date}}</span>
              </div>
              <div>
                <v-icon color="indigo">face</v-icon>
                <span color="indigo">{{directorName}}</span>
              </div>
            </v-flex>
            <v-flex xs12 md4 sm6>
              <div>
                <v-icon color="indigo">star</v-icon>
                <span color="indigo">{{film.vote_average}}</span>
              </div>
              <div>
                <v-icon color="indigo">av_timer</v-icon>
                <span color="indigo">{{film.runtime}} min</span>
              </div>
            </v-flex>
          </v-layout>

          <div color="indigo">
            <span>{{film.overview}}</span>
          </div>

          <YouTubeDialog v-bind:filmId="filmId"/>
          <v-btn
            block
            dark
            color="indigo"
            :loading="torrentLoading"
            @click="loadTorrentLinks"
          >Find Torrents !</v-btn>

          <v-list>
            <v-list-tile v-for="link in torrentLinks" :key="link.id">
              <v-list-tile-action>
                <a :href="link.magnet">
                  <v-icon>link</v-icon>
                </a>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{link.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
      <CardList v-bind:filmList="recommended"></CardList>
    </v-container>
  </v-app>
</template>


<script>
import api from "../services/api";
import axios from "axios";
import Card from "@/components/Card";
import config from "@/configs/config";
import YouTubeDialog from "@/components/YouTubeDialog";
import CardList from "@/components/CardList";

export default {
  components: {
    card: Card,
    YouTubeDialog,
    CardList
  },
  data() {
    return {
      film: {},
      filmId: this.$route.params.id,
      imgUrl: config.IMAGE_BASE_URL,
      torrentLinks: [],
      torrentLoading: false,
      recommended: [],
      filmStaff: [],
      directorName: ""
    };
  },
  methods: {
    loadContent() {
      axios
        .get(`${config.MOVIE_BASE_URL + this.filmId + config.API_KEY}`)
        .then(result => {
          this.film = result.data;
        });
      this.loadRecommended();
    },
    loadTorrentLinks() {
      this.torrentLoading = true;
      api.get(`/torrent/${this.film.title}`).then(result => {
        this.torrentLinks = result.data;
        this.torrentLoading = false;
      });
    },
    loadRecommended() {
      console.log("entrei aqui");
      axios
        .get(
          `${config.MOVIE_BASE_URL + this.filmId}/recommendations${
            config.API_KEY
          }`
        )
        .then(result => {
          this.recommended = result.data.results;
        })
        .catch(err => {});
    },
    loadCredits() {
      axios
        .get(`${config.MOVIE_BASE_URL + this.filmId}/credits${config.API_KEY}`)
        .then(result => {
          this.filmStaff = result.data;
          console.log(this.filmStaff.crew);

          this.filmStaff.crew.map(integrante => {
            if (integrante.job === "Director")
              this.directorName = integrante.name;
          });
        })
        .catch(err => {});
    }
  },

  mounted() {
    this.loadContent();
    this.loadCredits();
  }
};
</script>
