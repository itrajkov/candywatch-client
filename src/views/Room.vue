<template>
  <div id="room">
    <div v-if="room.exists" id="room_content">
      <div id="header">
        <SearchBar id="searchbar" @clicked="setCode" />
      </div>

      <div id="main">
        <div id="main-left"></div>

        <Video
          id="iframe"
          @skip_video="skipVideo"
          @pause_video="pauseVideo"
          @play_video="playVideo"
          v-bind:videoId="room.videoCode"
          :bus="bus"
        />

        <div id="main-right">
          <div id="roomID">
            <el-button
              v-clipboard:copy="getRoomID()"
              v-clipboard:success="onCopy"
              id="copy"
              icon="el-icon-copy-document"
              round
            ></el-button>
            <h2>{{room.roomID}}</h2>
          </div>
        </div>
      </div>
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
var config = require("../../api_config.json");
const socket = io(config.API_URL);
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
        center: false,
      },
      bus: new Vue(),
      mainkey: 0,
    };
  },

  methods: {
    onCopy() {
      this.$notify.success({
        dangerouslyUseHTMLString: true,
        title: "Copied!",
        duration: 500,
      });
      // this.$message({
      //   message: "Congrats, this is a success message.",
      //   type: "success",
      //   showClose: true,
      // });
    },
    setRoomExists() {
      fetch(config.API_URL + "/room_exists/" + this.$route.params.id).then(
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
    setCode(vidCode) {
      socket.emit("set_video", this.room.roomID, vidCode);
    },
    getRoomID() {
      return "https://candywatch.net/room/" + this.room.roomID;
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
    socket.on("_set_video", (vidCode) => {
      this.bus.$emit("set-video", vidCode);
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");

h2 {
  font-family: "Noto Sans JP", sans-serif;
  color: #ffffff;
  margin: 10px;
  padding: 10px;
}

#iframe {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-grow: 2;
  flex-basis: 66%;
}

#main {
  display: flex;
}

#header {
  display: flex;
  justify-content: center;
}

#searchbar {
  display: inline-flex;
  width: 50%;
  margin: 30px;
}

#roomID {
  display: inline-flex;
  background-color: #f74040;
  border: 3px solid white;
  border-radius: 15px;
}

#main-right {
  flex-grow: 1;
  flex-basis: 33%;
  justify-content: center;
  display: flex;
  align-items: flex-start;
}
#main-left {
  flex-grow: 1;
  flex-basis: 33%;
}

#footer {
  flex-grow: 1;
}

#copy {
  transform: scale(1, 1);
  margin: 10px;
  border: 0;
  color: #f74040;
  margin: auto;
  margin-left: 10px;
}

#copy:hover {
  background-color: #ffffff;
  border: 0;
  color: #f74040;
}

#copy:active {
  background-color: #ffaebc;
  transform: scale(0.8, 0.8);
  border: 0;
  color: #f74040;
}

.popup {
  padding: 20%;
  background-color: white;
}
</style>
