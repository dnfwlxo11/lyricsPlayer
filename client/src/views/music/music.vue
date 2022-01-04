<template>
    <div class="music">
        <top :popDialog="isLogin" @not-auth="isLogin=false;"></top>
        <div ref="audios" class="container p-0">
            <div class="profile mb-2">
                <img class="w-100" :src="require(`@/assets/dummy/${dummy[musicId]}.jpg`)" :alt="dummy[musicId]" style="height: 700px; object-fit: cover;">
            </div>
            <div class="mb-5">
                <div class="row m-0 p-0 d-flex justify-content-center align-items-center">
                    <div class="col-md-2 m-0 p-0 mt-2 mb-2 pl-2 pr-2">
                        <img class="musician-img" src="@/assets/dummy/musician.png" alt="대추" @click="$router.push(`/musician/대추`)">
                    </div>
                    <div class="col-md-8 m-0 p-0 w-100 pl-2 pr-4 mb-3">
                        <i v-if="!isPlay" class="mr-3 play-btn mdi mdi-arrow-right-drop-circle-outline" style="font-size: 65px;float: left;" @click="musicControl"></i>
                        <i v-else class="mr-3 play-btn mdi mdi-pause-circle-outline" style="font-size: 65px;float: left;" @click="musicControl"></i>
                        <div class="row m-0 p-0 mb-2 mt-3 text-left"><h3 class="m-0 p-0">{{dummy[musicId]}}</h3></div>
                        <div class="row m-0 p-0 text-left"><small class="m-0 p-0" @click="$router.push('/musician/대추')"> 대추</small></div>
                        <div>
                            <progress ref="progress" :value="(currentTime/duration)*100" max="100" style="height: 50px;width: 100%;" @click="timeMove"></progress>
                        </div>
                        <div class="w-100">
                            <div class="text-left" style="float: left;">
                                <span>{{calcTime(currentTime)}}</span>
                            </div>
                            <div class="text-right">
                                <span>{{calcTime(duration)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 h-100 p-0">
                        <div class="card text-left w-100 m-0 p-2 mb-3">
                            <div class="ml-2">
                                <div class="mb-1">좋아요 🙆‍♀️🙆‍♂️</div>
                                <hr>
                                <div class="d-flex justify-content-start align-items-center">
                                    <img v-for="(item, idx) in likes" :key="idx" class="like-img mr-1 w-25" :src="require(`@/assets/dummy/fan.png`)" alt="대추">
                                    <div><i class="more mdi mdi-plus"></i></div>
                                </div>
                            </div>
                        </div>
                        <div class="card text-left w-100 m-0 p-2">
                            <div class="ml-2">
                                <div class="mb-1">구독 👆</div>
                                <hr>
                                <div class="d-flex justify-content-start align-items-center">
                                    <img v-for="(item, idx) in subscribes" :key="idx" class="subscriber-img mr-1 w-25" :src="require(`@/assets/dummy/fan.png`)" alt="대추">
                                    <div><i class="more mdi mdi-plus"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <comments @on-login="mustLogin"></comments>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue';
import top from '@/components/Nav.vue'
import comments from '@/views/music/vues/comments.vue'

export default {
    name: 'Music',
    components: {
        top,
        comments,
    },
    data() {
        return {
            musicId: null,
            dummy: { '1': 'persian', '2': 'british', '3': 'scotish', '4': 'russian', '5': 'siam', '6': 'regdoll', 
                     '7': 'cat1', '8': 'cat2', '9': 'cat3', '10': 'cat4', '11': 'cat5', '12': 'cat6' },
            likes: [1, 2, 3],
            subscribes: [1, 2, 3],
            isLogin: false,
            isPlay: false,
            audioPlayer: null,
            currentTime: 0,
            duration: 0,
            originSrc: '',
        }
    },
    created() {
        this.audioPlayer = this.$store.getters.getAudioPlayer;
        this.audioPlayer.volume = 1;
        
        this.audioPlayer.addEventListener('loadedmetadata', (e) => {
            this.duration = this.audioPlayer.duration;
            this.currentTime = this.audioPlayer.currentTime;
        });
        this.audioPlayer.addEventListener('timeupdate', (e) => {
            if (sessionStorage.getItem('x_auth') == null && this.audioPlayer.currentTime > 5) {
                this.audioPlayer.pause();
                this.isPlay = false;
                this.isLogin = true;
            }

            this.duration = this.audioPlayer.duration;
            this.currentTime = this.audioPlayer.currentTime;
        });

        this.audioPlayer.addEventListener('play', (e) => { this.isPlay = true; });
        this.audioPlayer.addEventListener('ended', (e) => { this.isPlay = false; });

        this.musicId = this.$route.params.musicId;
        this.setMusic();

        window.scrollTo(0, 0);
    },
    mounted() {
        this.setMusic();
    },
    destroyed() {
        this.audioPlayer.removeEventListener('play', () => { this.isPlay = false; });
        this.audioPlayer.removeEventListener('ended', () => { this.isPlay = false; });
        this.audioPlayer.removeEventListener('loadedmetadata', () => { this.isPlay = false; });
        this.audioPlayer.removeEventListener('timeupdate', () => { this.isPlay = false; });
    },
    methods: {
        setMusic() {
            if (!this.audioPlayer.paused) this.audioPlayer.pause();
            this.currAudioName = 'Secrets';
            this.originSrc = `/api/music/play/Secrets.mp3`;
            this.audioPlayer.src = `/api/music/play/Secrets.mp3`;
        },

        musicControl() {
            if (this.audioPlayer.paused) this.audioPlayer.play();
            else this.audioPlayer.pause();

            this.isPlay = !this.isPlay;
        },

        mustLogin() {
            this.isLogin = true;
            console.log('로그인해!');
        },

        calcTime(time) {
            return (time/60 < 10 ? '0' + Math.floor(time/60).toString() : Math.floor(time/60).toFixed(0).toString()).toString() + ':' + (time%60 < 10 ? '0' + Math.floor(time%60).toString() : Math.floor(time%60).toString()).toString();
        },

        timeMove(e) {
            if (e == undefined) return;
            let time = Math.floor(this.duration * (e.offsetX / this.$refs.progress.offsetWidth)).toString();
            
            Vue.set(this.audioPlayer, 'currentTime', time);
            this.audioPlayer.play();
        }
    },
}
</script>

<style scope>
progress {
    border-radius: 0;
    color: #3C3D59;
    border: 1px solid lightgrey;
}

progress::-webkit-progress-value {
    background-color: #F2D4C9;
}

progress::-webkit-progress-bar {
    background-color: white;
}

.play-btn:hover, .musician-img:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
}

.musician-img {
    width: 85%;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}

ul {
    list-style: none;
}

.like-img, .subscriber-img {
    width: 40px;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}

@media all and (max-width: 767px) {
    .more {
        font-size: 40px;
    }
}

</style>