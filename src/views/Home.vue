<template>
    <div id="home">
        <el-button @click="createRoom" id="createRoom" type="primary">Create room</el-button><br/>
        <!-- <el-button id="joinRoom" type="primary">Join room</el-button> -->
    </div>
</template>

<script>
export default {
  methods:{
      createRoom(){
          fetch("http://localhost:3000/create_room")
          .then(response => response.json())
          .then(data => (this.$router.push("/room/"+data.roomID)));
      } 
  },
}
</script>

<style>
 #home{
     margin-top: 5%;
 }

 #joinRoom{
    margin:1%;
    background-color: #FCB9B5; 
    border:0;
    border-radius:15px;
    width:20%;
 }

 #createRoom{
    margin:1%;
    background-color: #FCB9B5; 
    border:0;
    border-radius:15px;
    width:20%;
 }
 
 #joinRoom:active{
  background-color:#FF96BC;
  transform: scale(0.9, 0.9);
 }

 #createRoom:active{
  background-color:#FF96BC;
  transform: scale(0.9, 0.9);
 }

</style>
