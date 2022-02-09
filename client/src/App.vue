<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app',
    created() {
        window._globalAudio = new Audio();

        window._globalAudio.volume = 1;

        window._globalAudio.addEventListener('loadedmetadata', (e) => {
            this.$store.commit('setDuration', window._globalAudio.duration);
            this.$store.commit('setCurrentTime', window._globalAudio.currentTime);
        });

        window._globalAudio.addEventListener('timeupdate', (e) => {
            console.log(window._globalAudio.currentTime)
            this.$store.commit('setCurrentTime', window._globalAudio.currentTime);
        });

        window._globalAudio.addEventListener('play', (e) => {
            this.$store.commit('setPlayState', true);
        });

        window._globalAudio.addEventListener('ended', (e) => {
            this.$store.commit('setPlayState', false);
            this.$store.commit('setCurrName', 'none');
            this.$store.commit('setDuration', 'none');
            this.$store.commit('setCurrentTime', 'none');
        });
    }
}
</script>

<style lang="scss">

    .btn {
        color: white;
        background-color: #6872A6;
        border: none;
    }

    .btn:hover {
        color: white;
        background-color: #F2D4C9;
        border: none;
        color: #3C3D59;
    }

    input {
        background-color: #F2F2F2;
        color: #A599B0;
        border: none;
        outline: none;
        width: 40%;
        height: 40%;
        border-radius: 0.5rem;
    }

    .album:hover {
        -webkit-transform: scale(1.2);
        transform: scale(1.1);
        -webkit-transition: .3s;
        transition: .3s;
    }
</style>