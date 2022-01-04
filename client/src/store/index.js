import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function setAudioPlayer() {
  let audioPlayer = new Audio();
  audioPlayer.volume = 1;

  audioPlayer.addEventListener('loadedmetadata', (e) => {
    console.log(e, 'in vuex by loadedmetadata');
  });

  audioPlayer.addEventListener('timeupdate', (e) => {
    console.log(e, 'in vuex by timeupdate');
  });

  audioPlayer.addEventListener('play', (e) => { 
    console.log(vuex)
    vuex.state.isPlay = true;
  });

  audioPlayer.addEventListener('ended', (e) => { 
    vuex.state.isPlay = false;
    vuex.state.currMusic = 'none';
  });

  return audioPlayer;
}

const vuex = new Vuex.Store({
  state: {
    audioPlayer: setAudioPlayer(),
    currMusic: 'none',
    isPlay: false,
  },
  mutations: {
    setCurrMusic(state, name) {
      state.currMusic = name;
    },
    setMusicSrc(state, src) {
      state.audioPlayer.src = src;
    },
    setPlayState(state, playState) {
      state.isPlay = playState;
    }
  },
  getters: {
    getAudioPlayer(state) {
      return state.audioPlayer;
    },
    getCurrMusic(state) {
      return state.currMusic;
    },
    getPlayState(state) {
      return state.isPlay;
    }
  }
})

export default vuex;
