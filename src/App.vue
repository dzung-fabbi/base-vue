<template>
  <div id="app">
    <Loading ref="loading" />
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import Loading from "./components/Loading";

const defaultLayout = 'default';

export default {
  el: "#app",
  data() {
    return {
      layout: 'empty-layout'
    }
  },
  components: {
    Loading
  },
  watch:{
    $route (to){
      this.layout = `${to.meta.layout || defaultLayout}-layout`;
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
