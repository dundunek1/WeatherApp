<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(-225deg, #65379b 0%, #886aea 53%, #6457c6 100%);
  background-size: cover;
  background-attachment: fixed;
}
</style>
