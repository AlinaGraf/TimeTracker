<template>
  <div>
    <artmart-header />
    <router-view ></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    "artmart-header": Header
  },
  computed: {
   
  },
  beforeCreate() {
   
  }
};
</script>

<style>
</style>
