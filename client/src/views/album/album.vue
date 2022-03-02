<template>
    <div class="albumpage">
        <top></top>
        <div class="container">
            <div v-if="albumInfo">
                <div class="row" style="height: 250px;">
                    <div class="col-3 d-flex justify-content-center align-items-center">
                        <img class="album-img" :src="`${albumInfo.thumbnail_path}`" alt="">
                    </div>
                    <div class="col-9 d-flex justify-content-start align-items-center">
                        <div class="text-left">
                            <div><h2>{{albumInfo.album_name}}</h2></div>
                            <div><h6 @click="$router.push(`/musician/${albumInfo.musician_name}`)">{{albumInfo.musician_name}}</h6></div>
                            <div v-if="albumTrack.length">
                                <h6>{{albumTrack.length}}개의 노래</h6>
                            </div>
                            <div v-else>
                                <div><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="mb-3 d-flex align-items-center">
                        <i class="mdi mdi-post-outline mr-2" style="font-size: 30px;"></i>
                        <div v-if="albumTrack.length">
                            <span>{{albumTrack.length}} songs</span>
                        </div>
                        <div v-else>
                            <div><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                        </div>
                    </div>
                </div>
                <div v-for="(item, idx) of albumTrack" :key="idx">
                    <hr>
                    <div class="row">
                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <img class="song-img" :src="`${item.songImg}`" @click="$router.push(`/music/${albumInfo.musician_name}/${item.song_name}/${item.sid}`)">
                        </div>
                        <div class="col-9 d-flex justify-content-start align-items-center">
                            <div class="text-left">
                                <div><h5 @click="$router.push(`/music/${albumInfo.musician_name}/${item.song_name}/${item.sid}`)">{{item.song_name}}</h5></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from '@/components/Nav.vue'

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
            let res = await this.$Api.post(`/api/album/info/${this.$route.params.aid}`)
            
            if (res.data.success) this.albumInfo = res.data.result
        },

        async getAlbumMusics() {
            let res = await this.$Api.post(`/api/album/${this.$route.params.aid}`)
            
            if (res.data.success) this.albumTrack = res.data.result
        }
    },
}
</script>

<style scoped>
.album-img {
    height: 200px;
    width: 100%;
}

.song-img {
    object-fit: cover;
    height: 150px;
    width: 100%;
}
</style>