<template>
  <div id="home">
    <Candy class="animated bounceIn" id="candy" />
    <h1 class="animated bounceIn" id="title">Candywatch</h1>
    <div id="buttons">
      <el-button
        class="animated bounceIn"
        @click="createRoom"
        id="createRoom"
        type="primary"
      >Create room</el-button>
      <br />
      <el-button class="animated bounceIn" id="joinRoom" type="primary">Join room</el-button>
    </div>
  </div>
</template>

<script>
import Candy from "@/components/Candy";
var config = require("../../api_config.json");
export default {
  methods: {
    createRoom() {
      fetch(config.API_URL + "/create_room")
        .then((response) => response.json())
        .then((data) => this.$router.push("/room/" + data.roomID));
    },
  },
  components: {
    Candy,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

body {
  margin-top: 30px;
}

#buttons {
  display: flex;
  margin: 20px;
  flex-direction: column;
  align-items: center;
}

#title {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-drag: none;
  margin: 0;
  font-family: "Pacifico", cursive;
  font-size: 90px;
  color: #f74040;
  text-shadow: 5px 5px #ffffff;
  text-align: center;
}

#joinRoom {
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Pacifico", cursive;
  font-size: 30px;
  background-color: #f74040;
  border: 0;
  border-radius: 15px;
  width: 300px;
}

#createRoom {
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Pacifico", cursive;
  font-size: 30px;
  background-color: #f74040;
  border: 0;
  border-radius: 15px;
  width: 300px;
  text-align: center;
}

#joinRoom:active {
  background-color: #ce373c;
  width: 250px;
}

#createRoom:active {
  background-color: #ce373c;
  width: 250px;
}

@-webkit-keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@media only screen and (max-width: 768px) {
  #title {
    user-select: none;
    font-size: 60px;
  }
}

#candy {
  text-align: center;
}
</style>
