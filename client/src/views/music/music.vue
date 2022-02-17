<template>
    <div class="music">
        <top :popDialog="isLogin" @not-auth="isLogin=false;"></top>
        <div ref="audios" class="container p-0">
            <div class="profile mb-2">
                <div class="row m-0 p-0">
                    <div v-if="!thumbnailPath" class="col-md-10 mb-2 d-flex justify-content-center align-items-center" style="height: 700px;"><i class="mdi mdi-loading mdi-spin" style="font-size: 80px;"></i></div>
                    <div v-else class="col-md-9 mb-2 " style="height: 700px;">
                        <img :src="`${thumbnailPath}`" style="height: 100%; width: 100%; object-fit: cover;" loading="lazy">
                    </div>
                    <!-- <strong style="height: 40px;">Relation List</strong> -->
                    <div class="card col-md-3" style="overflow-y: auto; height: 700px;">
                        <div v-for="(item, idx) of recommandList" :key="idx">
                            <hr>
                            <div class="row m-0 p-0">
                                <div class="col-md-3 p-0 m-0 d-flex justify-content-center align-items-center">
                                    <img class="recommandThumbnail" :src="`${item.thumbnail_path}`" style="object-fit: cover;" @click="$router.push(`/music/${item.musician_name.replaceAll(' ', '-')}/${item.song_name.replaceAll(' ', '-')}`, () => {}, () => {});">
                                </div>
                                <div class="col-md-9 text-left">
                                    <strong style="font-size: 12px;" @click="$router.push(`/music/${item.musician_name.replaceAll(' ', '-')}/${item.song_name.replaceAll(' ', '-')}`, () => {}, () => {})">{{item.song_name}}</strong> <br>
                                    <small style="font-size: 10px;" @click="$router.push(`/musician/${item.musician_name.replaceAll(' ', '-')}`)">{{item.musician_name}}</small>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
            <div class="mb-5">
                <div class="row m-0 p-0 d-flex justify-content-center align-items-center">
                    <div class="col-md-2 m-0 p-0 mt-2 mb-2 pl-2 pr-2">
                        <img class="musician-img" src="/images/musician.png" alt="대추" @click="$router.push(`/musician/${$route.params.musician}`)">
                    </div>
                    <div class="col-md-8 m-0 p-0 w-100 pl-2 pr-4 mb-3">
                        <div style="float: left">
                            <i v-if="$store.getters.getPlayState && musicState['name'] == currAudioName" class="mr-3 play-btn mdi mdi-pause-circle-outline" style="font-size: 65px; float: left" @click="musicControl"></i>
                            <i v-else class="mr-3 play-btn mdi mdi-arrow-right-drop-circle-outline" style="font-size: 65px; float: left;" @click="musicControl"></i>
                            <div class="row m-0 p-0 mb-2 mt-3 text-left"><h3 class="m-0 p-0"><strong>{{currAudioName}}</strong></h3></div>
                            <div class="row m-0 p-0 text-left"><small class="m-0 p-0" @click="$router.push(`/musician/${$route.params.musician}`)">{{$route.params.musician.replaceAll('-', ' ')}}</small></div>
                        </div>
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
                    <div class="col-md-2 p-0">
                        <div class="card text-left w-100 m-0 p-2" style="min-height: 110px;">
                            <div class="row m-0 p-0 mb-1">
                                <div class="m-0 p-0 col-6 text-left">좋아요</div>
                                <div class="m-0 p-0 col-6 text-right" style="font-size: 20px;"><i class="mdi mdi-thumb-up-outline" @click="like"></i></div>
                                <!-- <div class="col-5"><i class="mdi mdi-thumb-up"></i></div> -->
                            </div>
                            <hr class="m-0 p-0 mb-2">
                            <div class="d-flex justify-content-start align-items-center" @click="showLikes=true;">
                                <div v-if="likes == null">
                                    <div><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                                </div>
                                <div class="h-100 w-100 text-center" v-else-if="likes != null && !likes.length">
                                    <strong>첫 좋아요를 눌러보세요!</strong>
                                </div>
                                <div v-else>
                                    <img v-for="(item, idx) in likes" :key="idx" class="like-img mr-1 w-25" :src="`/images/user.png`" >
                                </div>
                                <div v-if="likes != null && likes.length == 3">
                                    <i class="more mdi mdi-plus"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <comments ref="comments" @on-login="mustLogin"></comments>
            <likeModal v-if="showLikes" @on-login="mustLogin" @click="showLikes=true;" @on-close="showLikes=false;" :title="$route.params.musicName.replaceAll('-', ' ')" :musician="$route.params.musician.replaceAll('-', ' ')"></likeModal>
        </div>
    </div>
</template>

<script>
import top from '@/components/Nav.vue'
import comments from '@/views/music/vues/comments.vue'
import likeModal from '@/views/music/vues/likes.vue'

export default {
    name: 'Music',
    components: {
        top,
        comments,
        likeModal,
    },
    data() {
        return {
            recommandList: [],
            thumbnailPath: null,
            likes: null,
            isLogin: false,
            showLikes: false,
            showSubscribes: false,
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
        this.audioPlayer = window._globalAudio;
        this.currAudioName = this.$route.params.musicName.replaceAll('-', ' ');
        this.musicState = this.$store.getters.getMusicState;
        this.isPlay = this.$store.getters.getPlayState;
    },
    destroyed() {
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.setMusic();
            this.getMusicInfo();
            this.getRankMusic();
            this.getLikeCount();
        },

        async getMusicInfo() {
            let res = await this.$Api.post(`/api/music/info`, { 'musicName': this.$route.params.musicName });

            if (res.data.success) {
                this.thumbnailPath = res.data.result.thumbnail_path;
                this.musicState['duration'] = res.data.result.playtime;
            }
        },

        async getRankMusic() {
            let res = await this.$Api.post('/api/music/ranking')

            if (res.data.success) this.recommandList = res.data.result
        },

        setMusic() {
            if (this.musicState['name'] == 'none') {
                window._globalAudio.src = `/api/music/play/${this.$route.params.musician}/${this.$route.params.musicName}.mp3`;
                this.$store.commit('setCurrMusic', this.$route.params.musicName.replaceAll('-', ' '));
            }
        },

        musicControl() {
            if (this.musicState['name'] != this.currAudioName) {
                window._globalAudio.src = `/api/music/play/${this.$route.params.musician}/${this.$route.params.musicName}.mp3`;
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
        },

        calcTime(time) {
            return (time/60 < 10 ? '0' + Math.floor(time/60).toString() : Math.floor(time/60).toString()).toString() + ':' + (time%60 < 10 ? '0' + Math.floor(time%60).toString() : Math.floor(time%60).toString()).toString();
        },

        timeMove(e) {
            if (e == undefined) return;
            if (this.musicState['name'] != this.currAudioName) {
                window._globalAudio.src = `/api/music/play/${this.$route.params.musician}/${this.$route.params.musicName}.mp3`;
                this.$store.commit('setCurrMusic', this.$route.params.musicName.replaceAll('-', ' '));
            }

            let time = Math.floor(this.musicState['duration'] * (e.offsetX / this.$refs.progress.offsetWidth)).toString();
            
            window._globalAudio.currentTime = time
            this.audioPlayer.play();
        },

        async like() {
            if (this.$cookies.get('x_auth') != null) {
                let res = await this.$Api.post('/api/music/like', {
                    songName: this.$route.params.musicName.replaceAll('-', ' '),
                });

                if (res.data.success) this.getLikeCount();
            } else {
                this.mustLogin();
            }
        },

        async getLikeCount() {
            let sendData = {
                songName: this.$route.params.musicName.replaceAll('-', ' '),
                pageSize: 3,
                currPage: 0,
            }

            let res = await this.$Api.post('/api/music/likeCnt', sendData);

            if (res.data.success) {
                this.likes = res.data.result;
            }
        }
    },
    computed: {
        getMusicState() {
            let musicState = this.$store.getters.getMusicState

            return musicState
        }
    },
    watch: {
        getMusicState(val) {
            this.musicState = val;
        },
        '$route': function() {
            this.currAudioName = this.$route.params.musicName.replaceAll('-', ' ');
            this.musicState = this.$store.getters.getMusicState;
            this.isPlay = this.$store.getters.getPlayState;
            this.audioPlayer = window._globalAudio;

            this.init();
            this.$refs.comments.getComments();
            
            window.scrollTo(0, 0);
        }
    }
}
</script>

<style scoped>
body {
    -ms-overflow-style: none; 
} 

::-webkit-scrollbar { 
    display: none; 
}

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
    border: 1px solid lightgray;
}

ul {
    list-style: none;
}

.like-img, .subscriber-img {
    width: 40px;
    border-radius: 70%;
}

.modal-container{
    max-width: 640px;
    height: 480px;
    margin-top: 100px;
}

.recommandThumbnail {
    width: 100%;
}

@media all and (max-width: 767px) {
    .more {
        font-size: 40px;
    }
}

</style>