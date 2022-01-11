<template>
    <div class="home">
        <top></top>
        <div class="main">
            <img class="w-100 placeholder-glow" src="@/assets/main.png" alt="메인이미지">
        </div>
        <div class="search w-100 d-flex justify-content-center align-items-center mt-3 mb-3">
            <input class="text-center keyword-input" type="text" placeholder="원하는걸 적어봐" @keypress.enter="$router.push(`/search` + (keyword == '' ? '' : `?keyword=${keyword}${setParams()}`))" v-model="keyword">
            <button class="pr-3 mr-3 mdi mdi-magnify keyword-icon" @click="$router.push(`/search` + (keyword == '' ? '' : `?keyword=${keyword}${setParams()}`))"></button>
            <button class="btn btn-outline-primary" @click="moreOption=!moreOption">옵션 보기</button>
            </div>
        
        <div class="container trend">
            <div class="mb-5" style="height: 100px;" v-if="moreOption">
                <div class="card h-100 d-flex justify-content-center align-items-center">
                    <div class="row w-100" @change="setParams">
                        <div class="col-md-3 custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="switch1" v-model="searchOption.title">
                            <label class="custom-control-label" for="switch1">제목</label>
                        </div>
                        <div class="col-md-3 custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="switch2" v-model="searchOption.album">
                            <label class="custom-control-label" for="switch2">앨범</label>
                        </div>
                        <div class="col-md-3 custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="switch3" v-model="searchOption.musician">
                            <label class="custom-control-label" for="switch3">뮤지션</label>
                        </div>
                        <div class="col-md-3 custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="switch4" v-model="searchOption.lyrics">
                            <label class="custom-control-label" for="switch4">가사</label>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center mb-5" style="font-size: 20px;text-left;height: 15%;"><span>가장 인기있는 노래들을 들어보세요!</span></div>
            <div class="row m-0 p-0">
                <div class="col-md-2 mb-5 album" v-for="(item, idx) of musicRank" :key="idx" style="float: left;">
                    <div class="thumbnail card mb-1">
                        <img :src="item['thumbnail_path']" style="object-fit: cover;" @click="$router.push(`/music/${item['musician_name'].replaceAll(' ', '-')}/${item['song_name'].replaceAll(' ', '-')}`)" >
                        <div class="overlay d-flex justify-content-center align-items-center">
                            <i v-if="$store.getters.getPlayState && musicState.name == item['song_name']" class="mdi mdi-pause-circle-outline play" style="font-size: 80px" @click="musicControl(item['musician_name'], item['song_name'])"></i>
                            <i v-else class="mdi mdi-arrow-right-drop-circle-outline play" style="font-size: 80px" @click="musicControl(item['musician_name'], item['song_name'])"></i>
                        </div>
                    </div>
                    <div class="text-left">
                        <div class="music-info text-left">
                            <span @click="$router.push(`/music/${item['musician_name'].replaceAll(' ', '-')}/${item['song_name'].replaceAll(' ', '-')}`)">{{item['song_name']}}</span> <br>
                            <span @click="$router.push(`/musician/${item['musician_name'].replaceAll(' ', '-')}`)"><small>{{item['musician_name']}}</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
    import axios from 'axios'
    import top from '@/components/Nav.vue'
    import bottom from '@/components/Footer.vue'

    export default {
        name: 'Home',
        components: {
            top,
            bottom,
        },
        data() {
            return {
                musicRank: [],
                isRegister: false,
                isLogin: false,
                moreOption: false,
                searchOption: {
                    title: true, lyrics: true, musician: true, album: true,
                },
                keyword: '',
                audioPlayer: null,
                musicState: {
                    name: 'none',
                    duration: 'none',
                    currTime: 'none'
                },
            }
        },
        mounted() {
            this.musicState = this.$store.getters.getMusicState;
            this.audioPlayer = this.$store.getters.getAudioPlayer;
            this.getRankMusic()
        },
        methods: {
            setParams() {
                let params = `${this.searchOption.title ? '&title=true' : ''}${this.searchOption.lyrics ? '&lyrics=true' : ''}${this.searchOption.musician ? '&musician=true' : ''}${this.searchOption.album ? '&album=true' : ''}`
                return params
            },

            musicControl(musician, music) {
                console.log(musician, music)

                if (this.musicState.name != music) {
                    this.$store.commit('setCurrMusic', music);
                    this.$store.commit('setMusicSrc', `/api/music/play/${musician}/${music}.mp3`);
                    this.$store.commit('setPlayState', true);
                    this.musicState = this.$store.getters.getMusicState
                    this.audioPlayer.play();
                } else {
                    if (!this.$store.getters.getPlayState) {
                        this.$store.commit('setPlayState', true);
                        this.audioPlayer.play();
                        
                    } else {
                        this.$store.commit('setPlayState', false);
                        this.audioPlayer.pause();
                    }
                }
            },

            async getRankMusic() {
                let res = await axios.post('/api/music/ranking')

                if (res.data.success) this.musicRank = res.data.result
                console.log(res.data.result)
            }
        }
    }
</script>

<style>
    .top {
        position: fixed;
        z-index: 1000;
    }

    .search {
        height: 100px;
    }

    .keyword-input {
        border-radius: 0.5rem 0 0 0.5rem;
    }

    .keyword-icon {
        font-size: 20px;
        background-color: #F2F2F2;
        color: #A599B0;
        border: none;
        outline: none;
        height: 40%;
        border-radius: 0 0.5rem 0.5rem 0;
    }

    .trend {
        margin-bottom: 50px;
    }

    .thumbnail, .thumbnail > img{
        height: 200px;
    }

    .line {
        border-bottom: 2px solid grey;
        opacity: 0.2;
    }

    .innerIcon {
        position: relative;
        font-size: 30px;
    }

    .music-info:hover {
        cursor: pointer;
    }

    .thumbnail:hover {
        opacity: 0.8;
        transition: 1s ease;
        background-color: lightgrey;
    }

    .thumbnail:hover .overlay {
        opacity: 1;
        color: #6872A6;
    }

    .overlay > .play {
        cursor: pointer;
    }

    .overlay {
        position: absolute;
        top: 51%;
        left: 50%;
        height: 70px;
        width: 70px;
        opacity: 0;
        transition: .5s ease;
        transform: translate(-50%, -50%);
    }
</style>