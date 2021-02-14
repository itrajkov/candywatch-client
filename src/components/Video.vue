<template>
  <div>
    <el-row>
      <el-col :span="24">
        <youtube :video-id="videoId" ref="youtube" @playing="playing" @paused="paused"></youtube>
        <br />
      </el-col>
    </el-row>

    <div id="media-bar">
      <el-button @click="playPause" id="play" type="success" v-bind:icon="buttonIcon" circle></el-button>
      <el-slider
        @change="seekTo"
        :format-tooltip="formatToolTip"
        v-bind:max="vidDuration"
        id="slider"
        v-model="vidTime"
      ></el-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",

  props: {
    videoId: {
      type: String,
      default: "GMIQ8ZWRQXo",
      required: true,
    },
    bus: {},
  },

  components: {},
  data() {
    return {
      buttonIcon: "el-icon-video-play",
      vidTime: 0,
      isPlaying: false,
      vidDuration: 0,
    };
  },
  methods: {
    seekTo(val) {
      this.player.seekTo(val);
    },

    // FUNCTION TO SWITCH FROM PLAY TO PAUSE AND VICE VERSA
    playPause() {
      if (this.isPlaying) this.$emit("pause_video");
      else this.$emit("play_video");
    },

    // THIS IS RUNS IF THE VIDEO IS PLAYING
    playing() {
      this.player.playVideo();
      this.buttonIcon = "el-icon-video-pause";
      this.isPlaying = true;
    },

    // THIS IS RUNS IF THE VIDEO IS PLAYING
    paused() {
      this.player.pauseVideo();
      this.buttonIcon = "el-icon-video-play";
      this.isPlaying = false;
    },

    setCurrentTime() {
      this.player.getCurrentTime().then((val) => (this.vidTime = val));
      this.getDuration();
    },

    getDuration() {
      this.player.getDuration().then((val) => (this.vidDuration = val));
    },

    updateTimer: function () {
      window.setInterval(() => {
        // console.log(this.vidDuration);
        this.setCurrentTime();
      }, 1000);
    },

    formatToolTip(val) {
      let min = parseInt(val / 60);
      let sec = parseInt(val % 60);
      return min.toString() + ":" + sec.toString();
    },
  },

  created() {
    this.updateTimer();
  },

  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  mounted() {
    this.bus.$on("play-video", this.playing);
    this.bus.$on("pause-video", this.paused);
  },
};
</script>

<style>
#slider {
  padding-right: 2%;
  padding-left: 2%;
  margin-left: 5px;
  background-color: #ffaebc;
  border-radius: 10px;
  width: 50%;
}

#media-bar {
  display: flex;
  justify-content: center;
  margin-top: 1%;
}

iframe {
  margin-top: 1%;
  border: solid #ffaebc 25px;
  width: 60%;
  height: 600px;
  border-radius: 25px;
}

#play {
  background-color: #ffaebc;
  transform: scale(1.1, 1.1);
  border: 0;
}

#play:hover {
  background-color: #ff96bc;
  border: 0;
}

#play:active {
  background-color: #ff96bc;
  transform: scale(0.8, 0.8);
  border: 0;
}
</style>
