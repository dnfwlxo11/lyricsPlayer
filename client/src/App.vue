<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app',
    // mounted() {
    //     window._globalAudio = new Audio();;

    //     window._globalAudio.volume = 1;

    //     window._globalAudio.addEventListener('loadedmetadata', (e) => {
    //         Vue.set(vuex.state.currMusic, 'duration', vuex.state.audioPlayer.duration);
    //         Vue.set(vuex.state.currMusic, 'currentTime', vuex.state.audioPlayer.currentTime);
    //     });

    //     window._globalAudio.addEventListener('timeupdate', (e) => {
    //         Vue.set(vuex.state.currMusic, 'currentTime', vuex.state.audioPlayer.currentTime);
    //     });

    //     window._globalAudio.addEventListener('play', (e) => {
    //         vuex.state.isPlay = true;
    //     });

    //     window._globalAudio.addEventListener('ended', (e) => {
    //         vuex.state.isPlay = false;
    //         Vue.set(vuex.state.currMusic, 'name', 'none');
    //         Vue.set(vuex.state.currMusic, 'duration', 'none');
    //         Vue.set(vuex.state.currMusic, 'currentTime', 'none');
    //     });




        
    // }
}
</script>