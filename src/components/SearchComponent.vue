<template>
  <v-text-field
    filled
    rounded
    label="Search"
    prepend-inner-icon="search"
    @keyup.enter="search"
    v-model="input"
    dark
  />
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      input: ""
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "searchPage",
        params: { content: this.input }
      });
    }
  }
};
</script>

<style>
</style>