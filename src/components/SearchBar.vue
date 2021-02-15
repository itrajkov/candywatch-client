<template>
  <div id="searchdiv">
    <el-row>
      <el-col :span="22">
        <el-input id="link" placeholder="Video link" v-model="link"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button id="playVid" icon="el-icon-right" @click="passCode"></el-button>
      </el-col>
    </el-row>
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
      this.videoCode = this.link.slice(32);
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
  display: inline-block;
  width: 50%;
}

#playVid {
  background-color: #f74040;
  border: 0;
  border-radius: 20px;
  color: white;
}

#playVid:hover {
  background-color: #f74040;
  border: 0;
  border-radius: 20px;
  color: white;
}

#playVid:active {
  transform: scale(0.7);
  background-color: #f74040;
  border: 0;
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
