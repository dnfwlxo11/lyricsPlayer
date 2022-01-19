<template>
    <div class="albumpage">
        <top></top>
        <div class="container">
            <div v-if="albumInfo">
                <div class="row" style="height: 250px;">
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        <img class="album-img" :src="albumInfo.thumbnail_path" alt="">
                    </div>
                    <div class="col-9 d-flex justify-content-start align-items-center">
                        <div class="text-left">
                            <div><h2>{{albumInfo.album_name.replaceAll('-', ' ')}}</h2></div>
                            <div><h6>{{albumInfo.musician_name}}</h6></div>
                            <div><h6>{{albumTrack.length}}개의 노래</h6></div>
                        </div>
                    </div>
                </div>
                <div v-for="(item, idx) of albumTrack" :key="idx">
                    <div class="row">
                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <img class="song-img" :src="item.songImg" @click="$router.push(`/music/${albumInfo.musician_name}/${item.song_name}`)">
                        </div>
                        <div class="col-9 d-flex justify-content-start align-items-center">
                            <div class="text-left">
                                <div><h5 @click="$router.push(`/music/${albumInfo.musician_name}/${item.song_name}`)">{{item.song_name}}</h5></div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import top from '@/components/Nav.vue'
import axios from 'axios'

export default {
    name: 'Album',
    components: {
        top,
    },
    data() {
        return {
            albumTrack: [],
            albumInfo: null
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            await this.getAlbumInfo()
            await this.getAlbumMusics()
        },

        async getAlbumInfo() {
            let res = await axios.post(`/api/album/info/${this.$route.params.albumId.replaceAll(' ', '-')}`)
            
            if (res.data.success) this.albumInfo = res.data.result
        },

        async getAlbumMusics() {
            let res = await axios.post(`/api/album/${this.$route.params.albumId.replaceAll(' ', '-')}`)
            
            if (res.data.success) this.albumTrack = res.data.result
        }
    },
}
</script>

<style scoped>
.album-img {
    height: 50%;
    min-width: 80px;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}

.song-img {
    object-fit: cover;
    height: 100px;
    width: 100%;
}
</style>