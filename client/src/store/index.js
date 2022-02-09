import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  state: {
    user: null,
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
    setDuration(state, duration) {
      Vue.set(state.currMusic, 'duration', duration);
    },
    setCurrentTime(state, currentTime) {
      Vue.set(state.currMusic, 'currentTime', currentTime);
    },
    setPlayState(state, playState) {
      state.isPlay = playState;
    },
    setUserProfile(state, user) {
      state.user = user;
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
    },
  }
})

export default vuex;
