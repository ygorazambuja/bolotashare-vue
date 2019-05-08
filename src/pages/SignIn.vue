<template>
  <v-app>
    <v-container>
      <v-alert
        v-if="visible"
        type="warning"
        :value="true"
        class="font-weight-bold"
      >Ocorreu algum problema, tente novamente</v-alert>
      <v-layout align-center justify-center>
        <v-form method="POST">
          <v-text-field
            label="Username"
            prepend-icon="account_circle"
            type="text"
            v-model="username"
            clearable
            clear-icon="remove-circle"
            required
          />
          <v-text-field
            type="password"
            prepend-icon="vpn_key"
            v-model="password"
            label="Password"
            clear-icon="remove-circle"
            clearable
            required
          />
          <v-layout justify-center>
            <v-btn
              type="submit"
              v-on:click="doLogin"
              block
              dark
              class="indigo"
              :loading="loading"
            >Sign in</v-btn>
            <div>
              <v-input type="checkbox" v-model="checked"/>
            </div>
          </v-layout>
          <router-link to="/cadastro" style="text-decoration: none; color: white">
            <v-btn class="success" dark block>Registre-se Aqui!</v-btn>
          </router-link>
        </v-form>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import api from "../services/api";
export default {
  name: "SignIn",
  data () {
    return {
      message: "bejotashare",
      username: "",
      password: "",
      checked: false,
      visible: false,
      loading: false
    };
  },
  methods: {
    doLogin (event) {
      event.preventDefault();
      this.loading = true;

      const { username, password } = this;
      api
        .post("/authenticate", {
          crossdomain: true,
          username,
          password
        })
        .then(response => {
          const { username } = response.data.user;
          const { token } = response.data;
          this.loading = false;

          if (response.data.user.username) {
            localStorage.setItem("@bolotashare:username", username);
            localStorage.setItem("@bolotashare:token", token);
            this.$router.push({ name: "home" });
          }
        })
        .catch(() => {
          this.loading = false;
          this.showWarning();
        });
    },
    showWarning () {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 5000);
    },
    redirect () {
      const token = localStorage.getItem("@bolotashare:token");
      if (token) {
        return this.$router.push({ name: "home" });
      }
    }
  },
  mounted () {
    this.redirect();
  }
};
</script>
