import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function setAudioPlayer() {
  let audioPlayer = new Audio();
  audioPlayer.volume = 1;

  audioPlayer.addEventListener('loadedmetadata', (e) => {
    console.log(e, 'loadedmetadata')
    Vue.set(vuex.state.currMusic, 'duration', vuex.state.audioPlayer.duration);
    Vue.set(vuex.state.currMusic, 'currentTime', vuex.state.audioPlayer.currentTime);
  });

  audioPlayer.addEventListener('timeupdate', (e) => {
    Vue.set(vuex.state.currMusic, 'currentTime', vuex.state.audioPlayer.currentTime);
  });

  audioPlayer.addEventListener('play', (e) => { 
    console.log(e, 'play')
    vuex.state.isPlay = true;
  });

  audioPlayer.addEventListener('ended', (e) => { 
    console.log(e, 'ended')
    vuex.state.isPlay = false;
    Vue.set(vuex.state.currMusic, 'name', 'none');
    Vue.set(vuex.state.currMusic, 'duration', 'none');
    Vue.set(vuex.state.currMusic, 'currentTime', 'none');
  });

  return audioPlayer;
}

const vuex = new Vuex.Store({
  state: {
    audioPlayer: setAudioPlayer(),
    currMusic: {
      name: 'none',
      duration: 'none',
      currentTime: 'none'
    },
    isPlay: false,
  },
  mutations: {
    setCurrMusic(state, name) {
      Vue.set(state.currMusic, 'name', name);
    },
    setMusicSrc(state, src) {
      Vue.set(state.audioPlayer, 'src', src);
    },
    setMusicTime(state, time) {
      Vue.set(state.audioPlayer, 'currentTime', time);
    },
    setPlayState(state, playState) {
      state.isPlay = playState;
    },
  },
  getters: {
    getAudioPlayer(state) {
      return state.audioPlayer;
    },
    getMusicState(state) {
      return state.currMusic;
    },
    getPlayState(state) {
      return state.isPlay;
    }
  }
})

export default vuex;
