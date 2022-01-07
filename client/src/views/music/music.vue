<template>
    <div class="music">
        <top :popDialog="isLogin" @not-auth="isLogin=false;"></top>
        <div ref="audios" class="container p-0">
            <div class="profile mb-2">
                <img class="w-100" :src="require(`@/assets/dummy/${musicThumbnail[currAudioName]}.jpg`)" :alt="musicThumbnail[currAudioName]" style="height: 700px; object-fit: cover;">
            </div>
            <div class="mb-5">
                <div class="row m-0 p-0 d-flex justify-content-center align-items-center">
                    <div class="col-md-2 m-0 p-0 mt-2 mb-2 pl-2 pr-2">
                        <img class="musician-img" src="@/assets/dummy/musician.png" alt="대추" @click="$router.push(`/musician/대추`)">
                    </div>
                    <div class="col-md-8 m-0 p-0 w-100 pl-2 pr-4 mb-3">
                        <i v-if="$store.getters.getPlayState && musicState['name'] == currAudioName" class="mr-3 play-btn mdi mdi-pause-circle-outline" style="font-size: 65px;float: left;" @click="musicControl"></i>
                        <i v-else class="mr-3 play-btn mdi mdi-arrow-right-drop-circle-outline" style="font-size: 65px;float: left;" @click="musicControl"></i>
                        <div class="row m-0 p-0 mb-2 mt-3 text-left"><h3 class="m-0 p-0">{{currAudioName}}</h3></div>
                        <div class="row m-0 p-0 text-left"><small class="m-0 p-0" @click="$router.push('/musician/대추')">{{$route.params.musician.replaceAll('-', ' ')}}</small></div>
                        <div>
                            <progress ref="progress" :value="(musicState['name'] == currAudioName ? musicState['currentTime']/musicState['duration'] : 0)*100" max="100" style="height: 50px;width: 100%;" @click="timeMove"></progress>
                        </div>
                        <div class="w-100">
                            <div class="text-left" style="float: left;">
                                <span>{{musicState['name'] == currAudioName ? musicState['duration'] == 'none' ? '00:00' : calcTime(musicState['currentTime']) : "00:00"}}</span>
                            </div>
                            <div class="text-right">
                                <span>{{musicState['duration'] == 'none' ? '00:00' : calcTime(musicState['duration'])}}</span>
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
            musicDummy: { 'Dylan Emmet': 'Some Things Dont Change', 'RYYZN': 'Secrets', 'RYYZN': 'Passionate Affair', 'Vince Miranda': 'Mas Alla', 'Nick Ray': 'Tread Lightly', 'MODUS': 'My Love', 
                     'Kavi Jezzie Hockaday': 'Dont Throw Your Light Away', 'Kavi Jezzie Hockaday': 'Everyone Will Fall Down', 'Dylan Emmet': 'Some Things Dont Change', 'Color Out': 'Alone', 'Cole Powell': 'Always Ever Be', 'Cole Powell': 'Not the One to Say I Told You So' },
            musicThumbnail: { 'Some Things Dont Change': 'persian', 'Secrets': 'british', 'Passionate Affair': 'scotish', 'Mas Alla': 'russian', 'Tread Lightly': 'siam', 'My Love': 'regdoll', 
                     'Dont Throw Your Light Away': 'cat1', 'Everyone Will Fall Down': 'cat2', 'Some Things Dont Change': 'cat3', 'Alone': 'cat4', 'Always Ever Be': 'cat5', 'Not the One to Say I Told You So': 'cat6' },
            likes: [1, 2, 3],
            subscribes: [1, 2, 3],
            isLogin: false,
            audioPlayer: null,
            musicState: {
                name: 'none',
                duration: 'none',
                currTime: 'none'
            },
            currentTime: 0,
            duration: 0,
        }
    },
    created() {
        this.currAudioName = this.$route.params.musicName.replaceAll('-', ' ');
        this.musicState = this.$store.getters.getMusicState;
        this.isPlay = this.$store.getters.getPlayState;
        this.audioPlayer = this.$store.getters.getAudioPlayer;

        window.scrollTo(0, 0);
    },
    destroyed() {
    },
    mounted() {
        this.setMusic();
    },
    methods: {
        setMusic() {
            if (this.musicState['name'] == 'none') {
                this.$store.commit('setCurrMusic', this.$route.params.musicName.replaceAll('-', ' '));
                this.$store.commit('setMusicSrc', `/api/music/play/${this.$route.params.musician}/${this.$route.params.musicName}.mp3`);
            }
        },

        musicControl() {
            if (this.musicState['name'] != this.currAudioName) {
                this.$store.commit('setMusicSrc', `/api/music/play/${this.$route.params.musician}/${this.$route.params.musicName}.mp3`);
                this.$store.commit('setCurrMusic', this.$route.params.musicName.replaceAll('-', ' '));
            } 
            
            if (this.audioPlayer.paused) {
                this.$store.commit('setPlayState', true);
                this.audioPlayer.play();
                
            } else {
                this.$store.commit('setPlayState', false);
                this.audioPlayer.pause();
            }

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
            if (this.musicState['name'] != this.currAudioName) {
                this.$store.commit('setMusicSrc', `/api/music/play/${this.$route.params.musician}/${this.$route.params.musicName}.mp3`);
                this.$store.commit('setCurrMusic', this.$route.params.musicName.replaceAll('-', ' '));
            }

            let time = Math.floor(this.musicState['duration'] * (e.offsetX / this.$refs.progress.offsetWidth)).toString();
            
            this.$store.commit('setMusicTime', time);
            this.audioPlayer.play();
        }
    },
    computed: {
        getMusicState() {
            let musicState = this.$store.getters.getMusicState

            return 
        }
    },
    watch: {
        getMusicState(val) {
            this.musicState = val;
        }
    }
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