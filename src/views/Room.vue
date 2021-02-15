<template>
  <div id="room">
    <div v-if="room.exists" id="room_content">
      <el-row>
        <el-col :span="24">
          <h2>Room ID: {{room.roomID}}</h2>

          <br />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <SearchBar @clicked="setCode" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <Video
            @skip_video="skipVideo"
            @pause_video="pauseVideo"
            @play_video="playVideo"
            v-bind:videoId="room.videoCode"
            :bus="bus"
          />
        </el-col>
      </el-row>
    </div>

    <div v-else>
      <h2>Room not found</h2>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SearchBar from "@/components/SearchBar";
import Video from "@/components/Video";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
export default {
  name: "Room",
  components: {
    Video,
    SearchBar,
  },

  data() {
    return {
      room: {
        videoCode: "GMIQ8ZWRQXo",
        roomID: this.$route.params.id,
        exists: false,
      },
      bus: new Vue(),
    };
  },

  methods: {
    setCode(value) {
      this.room.videoCode = value;
    },
    setRoomExists() {
      fetch("http://localhost:3000/room_exists/" + this.$route.params.id).then(
        (response) => {
          if (response.status === 200) {
            this.room.exists = true;
          } else this.room.exists = false;
        }
      );
    },
    playVideo() {
      socket.emit("play_video", this.room.roomID);
    },
    pauseVideo() {
      socket.emit("pause_video", this.room.roomID);
    },
    skipVideo(timestamp) {
      socket.emit("skip_video", this.room.roomID, timestamp);
    },
  },
  watch: {
    $route: function () {
      this.room.roomID = this.$route.params.id;
      this.setRoomExists();
    },
  },
  created() {
    this.setRoomExists();
    socket.emit("joined_room", this.room.roomID);
    socket.on("_pause_video", () => {
      this.bus.$emit("pause-video");
    });
    socket.on("_play_video", () => {
      this.bus.$emit("play-video");
    });
    socket.on("_skip_video", (timestamp) => {
      this.bus.$emit("skip-video", timestamp);
    });
  },
};
</script>

<style>
h2 {
  background-color: #b4f8c8;
  color: #85d2d0;
  border-radius: 15px;
  margin: 0px 25%;
  padding: 3px;
}
</style>

