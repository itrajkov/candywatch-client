<template>
  <div id="app">
      <Candy/>
      <Room roomID="CANDY"/>
  </div>
</template>

<script>
import Room from "@/components/Room";
import Candy from "@/components/Candy";
 // import io from "socket.io-client"
 // var socket = io.connect("http://localhost:3000");
export default {
  name: 'App',
  data(){
    return{
      time: 0
    }
  },
  components:{
      Room,
      Candy
  },
  methods:{

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
  margin-top: 10px;
}
</style>
