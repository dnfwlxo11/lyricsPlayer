import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function setAudioPlayer() {
  let audioPlayer = new Audio();
  audioPlayer.volume = 1;

  return audioPlayer;
}

const vuex = new Vuex.Store({
  state: {
    audioPlayer: setAudioPlayer(),
    currMusic: 'none',
  },
  mutations: {
  },
  getters: {
    getAudioPlayer(state) {
      return state.audioPlayer
    }
  }
})

export default vuex;
