<template>
  <div id="app">
      <Candy id="candy"/>
      <router-view></router-view>
  </div>
</template>

<script>
import Candy from "@/components/Candy";
 export default {
  name: 'App',
  data(){
    return{
    }
  },
  components:{
      Candy
  },
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
body{
  background-color: #A0E7E5;
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

 #candy{
     margin-bottom:2%;
 }
</style>
