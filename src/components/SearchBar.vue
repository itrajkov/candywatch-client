<template>
  <div id="searchdiv">
    <el-input id="link" placeholder="Video link" v-model="link"></el-input>
    <el-button id="playVid" icon="el-icon-right" @click="passCode"></el-button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      link: "",
      videoCode: "",
    };
  },

  methods: {
    getCode() {
      this.videoCode = this.$youtube.getIdFromUrl(this.link);
      this.link = "";
      return this.videoCode;
    },
    passCode() {
      this.$emit("clicked", this.getCode());
    },
  },
};
</script>

<style>
#searchdiv {
}

#playVid {
  background-color: #f74040;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
}

#playVid:hover {
  background-color: #f74040;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
}

#playVid:active {
  transform: scale(0.7);
  background-color: #f74040;
  border: 2px solid white;
  border-radius: 20px;
  color: white;
}

#link {
  width: 100%;
  border: 0;
  text-align: center;
  border-radius: 20px;
  background-color: #ffffff;
}
</style>
