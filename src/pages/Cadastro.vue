<template>
  <v-app>
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 md4>
          <v-form>
            <v-alert type="warning" :value="true" class="font-weight-bold">Complete os Campos</v-alert>

            <v-text-field label="Username" v-model="username" required></v-text-field>
            <v-text-field label="Email" type="email" v-model="email" required></v-text-field>
            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            <v-text-field label="Type Password Again" type="password" v-model="passwordAux"></v-text-field>

            <v-btn block color="success" v-on:click="validateFields" :loading="loading">
              <v-icon left>thumb_up</v-icon>
              <span>Register !</span>
            </v-btn>

            <v-btn block class="indigo" dark @click="backToSignIn">Back to Sign In !</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import api from "../services/api";
import { close } from "fs";
export default {
  data: () => ({
    username: "",
    password: "",
    passwordAux: "",
    email: "",
    valid: false,
    passwordValidation: false,
    loading: false
  }),
  methods: {
    validateFields: function() {
      if (!this.password || this.password.length <= 0)
        return console.log("password cannot be empty");
      if (this.password != this.passwordAux)
        return console.log("passwords need to be equals");
      if (!this.username || this.username.length <= 0)
        return console.log("username cannot be empty");
      if (!this.email || this.email.length <= 0)
        return console.log("email cannot me empty");

      this.valid = true;
      const { email } = this;
      const regex = /.+@.+/;

      if (!regex.test(email)) return console.log("email invalido");
      this.makeAccount();
    },
    makeAccount: function() {
      this.loading = true;
      const { username, password, email } = this;

      api
        .post("/createUser", {
          crossdomain: true,
          username,
          password,
          email
        })
        .then(response => {
          this.loading = false;
          const { token } = response.data;
          const { username } = response.data.user;

          localStorage.setItem("@bolotashare:token", token);
          localStorage.setItem("@bolotashare:username", username);
          this.$router.push({ name: "home" });
        });
    },
    backToSignIn: function() {
      this.$router.push({ name: "signin" });
    }
  }
};
</script>
