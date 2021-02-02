<template>
  <div id="room">
    <el-row>
        <el-col :span="24">
            <h2>Room ID: {{room.roomID}}</h2><br/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <SearchBar @clicked="setCode"/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <Video v-bind:videoId="room.videoCode"/>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Video from "@/components/Video";
 // import io from "socket.io-client"
 // var socket = io("http://localhost:3000");
export default {

  name: 'Room',
  components:{
      Video,
      SearchBar
  },

  data(){
    return{
       room : {
        videoCode: 'GMIQ8ZWRQXo',
        roomID: this.$route.params.id,
      }
    }
  },

  methods:{
      setCode(value){
          this.room.videoCode = value;
      }

  },

  created(){
  },

  watch: {
    '$route': function() {
      this.room.roomID = this.$route.params.id;
    }
  }
}
</script>

<style>
 h2{
  background-color:#B4F8C8;
  color:#85D2D0;
  border-radius:15px;
  margin: 0px 25%;
  padding:3px;
 } 
 
 #room{
     /* display: inline-block; */
 }
</style>

