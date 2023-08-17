<template>
  <div id="app">
    <h1> BookStore </h1>
    <Books />
  </div>
</template>

<script>
import Books from './components/Books.vue';

export default {
  name: 'App',
  components: {
    Books
  },
  mounted(){
    console.log(process.env.VUE_APP_BASE_URL)
  }
}
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
