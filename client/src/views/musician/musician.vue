<template>
    <div class="musician">
        <top></top>
        <div class="container">
            <div class="row" style="height: 250px;">
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <img class="musician-img" :src="`/images/musician.png`" alt="">
                </div>
                <div class="col-9 d-flex justify-content-start align-items-center">
                    <div class="text-left">
                        <div><h2>{{musician.replaceAll('-', ' ')}}</h2></div>
                        <div><h6>{{Object.keys(albumDummy).length}}개의 앨범</h6></div>
                        <div><h6>{{musics.length}}개의 노래</h6></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-album mr-2" style="font-size: 30px;"></i>
                    <span>{{Object.keys(albumDummy).length}} albums</span>
                </div>
            </div>
            <div v-if="!Object.keys(albumDummy).length" class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div v-else v-for="(value, key) in albumDummy" :key="key" class="mb-3">
                <hr>
                <div class="row">
                    <div class="col-md-3">
                        <img class="song-img" :src="`/images/${value}.jpg`" alt="대추">
                    </div>
                    <div class="col-md-9 text-left pt-3 pb-3">
                        <div class="row h-75 pl-3 pr-3">
                            <div>
                                <h5 class="m-0">{{value}}</h5>
                                <small>{{musician.replaceAll('-', ' ')}}</small>
                            </div>
                        </div>
                        <div class="row h-25 pl-3 pr-3">
                            <div class="d-flex justify-content-start align-items-end" style="font-size: 15px;">
                                <div><i class="mdi mdi-likes"></i><span>{{musics.length}}개의 노래 수록</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-5"></div>
            <div>
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-post-outline mr-2" style="font-size: 30px;"></i>
                    <span>{{musics.length}} songs</span>
                </div>
            </div>
            <div v-if="!musics.length" class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div v-else v-for="(item, key) in musics" :key="key" class="mb-3">
                <hr>
                <div class="row">
                    <div class="col-md-3">
                        <img class="song-img" :src="`/images/${musicThumbnail[item.replaceAll(' ', '-')]}.jpg`" alt="대추" @click="$router.push(`/music/${musician}/${item}`)">
                    </div>
                    <div class="col-md-9 text-left pt-3 pb-3">
                        <div class="row h-75 pl-3 pr-3">
                            <div>
                                <h5 class="m-0" @click="$router.push(`/music/${musician}/${item}`)">{{item}}</h5>
                                <small>{{musician.replaceAll('-', ' ')}}</small>
                            </div>
                        </div>
                        <div class="row h-25 pl-3 pr-3">
                            <div class="d-flex justify-content-start align-items-end" style="font-size: 15px;">
                                <div><i class="mdi mdi-likes"></i><span>좋아요🙆‍♀️🙆‍♂️ 780개</span></div>,&nbsp;
                                <div><span>구독👆 70개</span></div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-5"></div>
        </div>
    </div>
</template>

<script>
import top from '@/components/Nav.vue'
import axios from 'axios'

export default {
    name: 'Musician',
    components: {
        top,
    },
    data() {
        return {
            albumDummy: {
                'album': 'persian'
            },
            musicThumbnail: { 'Some-Things-Dont-Change': 'persian', 'Secrets': 'british', 'Passionate-Affair': 'scotish', 'Mas-Alla': 'russian', 'Tread-Lightly': 'siam', 'My-Love': 'regdoll', 
                'Dont-Throw-Your-Light-Away': 'cat1', 'Everyone-Will-Fall-Down': 'cat2', 'Some-Things-Dont-Change': 'cat3', 'Alone': 'cat4', 'Always-Ever-Be': 'cat5', 'Not-the-One-to-Say-I-Told-You-So': 'cat6' },
            albums: [],
            musics: [],
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.musician = this.$route.params.musicianId;
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getMusics()
            this.getAlbums()
        },

        async getMusics() {
            let res = await axios.get(`/api/music/songs/${this.$route.params.musicianId}`)
            
            if (res.data.success) this.musics = res.data.musics.map(item => item.replace('.mp3', ''))
            console.log(this.musics)
        },

        async getAlbums() {
            let res = await axios.get(`/api/music/albums/${this.$route.params.musicianId}`)
            
            if (res.data.success) this.albums = res.data.albums
        }
    },
}
</script>

<style scoped>
.musician-img {
    width: 70%;
    min-width: 80px;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}

.song-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>