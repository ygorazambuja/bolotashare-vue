<template>
  <v-app>
    <v-alert
      type="success"
      :value="true"
      class="font-weight-bold"
    >Bem vindo {{username}} ! Estamos Redirecionando Você !</v-alert>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    username: localStorage.getItem("@bolotashare:username")
  }),
  methods: {
    redirect() {
      setTimeout(() => {
        this.$router.push({ name: "trendingMovies" });
      }, 2000);
    }
  },
  mounted() {
    this.redirect();
  }
};
</script>

<style scoped>
</style>

