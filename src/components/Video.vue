<template>
  <div>
    <div id="iframeDiv">
      <youtube
        :player-vars="playerVars"
        :video-id="vidCode"
        :resize="true"
        ref="youtube"
        @playing="playing"
        @paused="paused"
      ></youtube>
    </div>

    <div id="media-bar">
      <el-button @click="playPause()" id="play" type="success" v-bind:icon="buttonIcon" circle></el-button>
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

<script scoped>
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
      vidCode: this.videoId,
      playerVars: {
        controls: 0,
        disablekb: 1,
      },
    };
  },
  methods: {
    seekTo(val) {
      this.$emit("skip_video", val);
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

    skipVideo(timestamp) {
      this.vidTime = timestamp;
      this.player.seekTo(timestamp);
    },

    setVideo(vidCode) {
      this.vidCode = vidCode;
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
    this.bus.$on("skip-video", this.skipVideo);
    this.bus.$on("set-video", this.setVideo);
  },
};
</script>

<style>
#slider .el-slider__button {
  border: 2px solid white;
  background-color: #f74040;
}

#slider .el-slider__bar {
  background-color: #a0e7e5;
}
#slider {
  padding-right: 20px;
  padding-left: 20px;
  margin-left: 5px;
  background-color: #f74040;
  border-radius: 20px;
  width: 100%;
  border: 3px solid white;
}

#media-bar {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

iframe {
  border: solid #f74040 20px;
  border-radius: 25px;
  /* border: 3px solid #ffffff; */
  width: 100%;
  display: inline-block;
}

#play {
  user-select: none;
  -webkit-user-drag: none;
  -webkit-tap-highlight-color: transparent;
  background-color: #f74040;
  transform: scale(1.1, 1.1);
  border: 3px solid #ffffff;
}

#play:hover {
  background-color: #f74040;
}

#play:active {
  background-color: #f74040;
  transform: scale(0.8, 0.8);
  border: 3px solid #ffffff;
}

#iframeDiv {
  display: flex;
  justify-content: center;
}
</style>
