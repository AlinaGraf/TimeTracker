<template>
  <div id="app">
    <header-timetracker />
    <router-view ></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    "header-timetracker": Header
  },
  computed: {
   
  },
  beforeCreate() {
   
  }
};
</script>

<style>
</style>
