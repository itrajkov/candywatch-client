<template>
  <div id="room">
    <el-row>
        <el-col :span="24">
            <h2>Room ID: {{roomID}}</h2><br/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <SearchBar @clicked="setCode"/>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <Video v-bind:videoId="videoCode"/>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import Video from "@/components/Video";

export default {
  name: 'Room',
  props:{
      roomID:{
          type:String,
          required:true

      }
  },

  components:{
      Video,
      SearchBar
  },

  data(){
    return{
       videoCode: 'GMIQ8ZWRQXo',
    }
  },

  methods:{
    setCode (value) {
      console.log(value)
      this.videoCode = value
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

