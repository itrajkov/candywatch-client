<template>
  <div>

    <el-row>
      <el-col :span="24">
        <youtube :video-id="videoId" ref="youtube" @playing="playing" @paused="paused"></youtube><br/>
      </el-col>
    </el-row>


    <div id="media-bar">
    <el-row>
      <el-col :span="2">
        <el-button @click="playPause" id="play" type="success" v-bind:icon="buttonIcon" circle></el-button>
      </el-col>
      <el-col :span="22">
        <el-slider @change="seekTo" :format-tooltip="formatToolTip" v-bind:max="vidDuration" id="slider" v-model="vidTime"></el-slider>
      </el-col>
    </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Video',

  props:{
    videoId: {
        type: String,
        default: 'GMIQ8ZWRQXo',
        required: true,
    },
    bus:{},
  },
     
  components:{
  },
  data() {
    return {
        buttonIcon: 'el-icon-video-play',
        vidTime: 0,
        isPlaying: false,
        vidDuration: 0,
    }
  },
  methods:{

    seekTo(val){
        this.player.seekTo(val);
    },
      
    // FUNCTION TO SWITCH FROM PLAY TO PAUSE AND VICE VERSA
    playPause() {
      if (this.isPlaying)
        this.$emit('pause_video')
      else
        this.$emit('play_video')
    },

    // THIS IS RUNS IF THE VIDEO IS PLAYING
    playing() {
        this.player.playVideo();
        this.buttonIcon = 'el-icon-video-pause';
        this.isPlaying = true;
    },

    // THIS IS RUNS IF THE VIDEO IS PLAYING
    paused() {
        this.player.pauseVideo();
        this.buttonIcon = 'el-icon-video-play';
        this.isPlaying = false;
    },

    setCurrentTime(){
        this.player.getCurrentTime().then((val) => this.vidTime = val);
        this.getDuration();
    },

    getDuration(){
        this.player.getDuration().then((val) => this.vidDuration = val);
    },

    updateTimer: function () {
      window.setInterval(() => {
          // console.log(this.vidDuration);
          this.setCurrentTime();
      }, 1000)
    },

    formatToolTip(val){
        let min = parseInt(val/60);
        let sec = parseInt(val%60);
        return min.toString() + ":" + sec.toString();
    }
  },

  created () {
      this.updateTimer();
  },

  computed: {
      player() {
        return this.$refs.youtube.player;
      }
  },
  mounted(){
      this.bus.$on('play-video', this.playing);
      this.bus.$on('pause-video', this.paused);
  }
}


</script>

<style>

 #slider{
  padding-right:2%;
  padding-left:2%;
     /* width:54%;    */
     /* margin-left:5%; */
  background-color: #FFAEBC;
  border-radius: 10px;
 }

 #media-bar{
     display: inline-block;
     margin-top:1%;
     /* margin-left:26%;     */
     width:50%;
 }
 
iframe {
  margin-top: 1%;
  border: solid #FFAEBC 25px;
  border-radius: 25px;
}

#play{
  background-color: #FFAEBC; 
  transform: scale(1.1, 1.1);
  border:0;
}

#play:hover{
  background-color: #FF96BC; 
  border:0;
}

#play:active{
  background-color: #FF96BC; 
  transform: scale(0.8, 0.8);
  border:0;
}
</style>
