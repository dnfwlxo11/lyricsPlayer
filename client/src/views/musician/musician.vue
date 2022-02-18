<template>
    <div class="musician">
        <top></top>
        <div class="container">
            <div class="row" style="height: 250px;">
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <div v-if="albums[0]">
                        <img class="musician-img" :src="`${albums[0].thumbnail_path}`" alt="">
                    </div>
                </div>
                <div class="col-9 d-flex justify-content-start align-items-center">
                    <div class="text-left">
                        <div><h2>{{musician}}</h2></div>
                        <div v-if="albums.length && albums.length">
                            <div><h6>{{albums.length}}개의 앨범</h6></div>
                            <div><h6>{{musics.length}}개의 노래</h6></div>
                        </div>
                        <div v-else style="height: 100px;">
                            <div><i class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></i></div>
                            <div><span>Loading...</span></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div>
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-album mr-2" style="font-size: 30px;"></i>
                    <div v-if="albums.length">
                        <span>{{albums.length}} albums</span>    
                    </div>
                    <div v-else>
                        <div><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                    </div>
                </div>
            </div>
            <div v-if="!albums.length" style="height: 200px;">
                <div><i class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></i></div>
                <div><span>Loading...</span></div>
            </div>
            <div v-else>
                <div v-for="(item, albumIdx) of albums" :key="albumIdx" class="mb-3">
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <img class="song-img" :src="`${item.albumImg}`" @click="$router.push(`/album/${item.album_name}`)">
                        </div>
                        <div class="col-md-9 text-left pt-3 pb-3">
                            <div class="row h-75 pl-3 pr-3">
                                <div>
                                    <h5 class="m-0" @click="$router.push(`/album/${item.album_name}`)">{{item.album_name}}</h5>
                                    <small>{{item.musician_name}}</small>
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
            </div>
            <div class="mb-5"></div>
            <div>
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-post-outline mr-2" style="font-size: 30px;"></i>
                    <div v-if="albums.length">
                        <span>{{musics.length}} musics</span>    
                    </div>
                    <div v-else>
                        <div><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                    </div>
                </div>
            </div>
            <div v-if="!musics.length" style="height: 200px;">
                <div><i class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></i></div>
                <div><span>Loading...</span></div>
            </div>
            <div v-else v-for="(item, musicIdx) of musics" :key="musicIdx" class="mb-3">
                <hr>
                <div class="row">
                    <div class="col-md-3">
                        <img class="song-img" :src="`${item.songImg}`" @click="$router.push(`/music/${item.musician_name}/${item.song_name}`)">
                    </div>
                    <div class="col-md-9 text-left pt-3 pb-3">
                        <div class="row h-75 pl-3 pr-3">
                            <div>
                                <h5 class="m-0" @click="$router.push(`/music/${item.musician_name}/${item.song_name}`)">{{item.song_name}}</h5>
                                <small>{{item.musician_name}}</small>
                            </div>
                        </div>
                        <div class="row h-25 pl-3 pr-3">
                            <div class="d-flex justify-content-start align-items-end" style="font-size: 15px;">
                                <div><i class="mdi mdi-likes"></i><span>🙆‍♀️ 좋아요 {{item.likes}}개 🙆‍♂️</span></div>
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

export default {
    name: 'Musician',
    components: {
        top,
    },
    data() {
        return {
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
            this.getMusicianMusic()
            this.getMusicianAlbum()
        },

        async getMusicianMusic() {
            let res = await this.$Api.post(`/api/musician/song/${this.$route.params.musicianId}`)
            
            if (res.data.success) this.musics = res.data.result
        },

        async getMusicianAlbum() {
            let res = await this.$Api.post(`/api/musician/album/${this.$route.params.musicianId}`)
            
            if (res.data.success) this.albums = res.data.result
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