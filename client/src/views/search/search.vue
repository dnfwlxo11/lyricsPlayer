<template>
    <div class="search">
        <top></top>
        <div v-if="this.keyword" class="container pt-5">
            <div class="text-left mb-5">
                <h3><strong>Search results for "{{keyword}}"</strong></h3>
            </div>
            <div v-if="this.options.title" class="text-left mb-5">
                <div class="mb-3">
                    <h5><strong>Title</strong></h5>
                    <small>Found {{titleResult.length}} songs.</small>
                </div>

                <div v-for="(value, key) in titleResult" :key="key">
                    <div class="row">
                        <div class="col-md-3 mr-3">
                            <img class="searchImg" :src="value.songImg">
                        </div>
                        <div class="col-md-7 mr-3">
                            <div><strong>{{value.song}}</strong></div>
                            <div><small>{{value.album}}</small></div>
                        </div>
                        <div class="col-md-2">

                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div v-if="this.options.lyrics" class="text-left mb-5">
                <div class="mb-3">
                    <h5><strong>Lyrics</strong></h5>
                    <small>Found {{lyricsResult.length}} songs.</small>
                </div>

                <div v-for="(value, key) in lyricsResult" :key="key">
                    <div class="row">
                        <div class="col-md-3 mr-3">
                            <img class="searchImg" :src="value.songImg">
                        </div>
                        <div class="col-md-7 mr-3">
                            <div><strong>{{value.song}}</strong></div>
                            <div><small>{{value.album}}</small></div>
                        </div>
                        <div class="col-md-2">

                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div v-if="this.options.album" class="text-left mb-5">
                <div class="mb-3">
                    <h5><strong>Album</strong></h5>
                    <small>Found {{albumResult.length}} albums.</small>
                </div>

                <div v-for="(value, key) in albumResult" :key="key">
                    <div class="row">
                        <div class="col-md-3 mr-3">
                            <img class="searchImg" :src="value.albumImg">
                        </div>
                        <div class="col-md-7 mr-3">
                            <div><strong>{{value.album}}</strong></div>
                            <div><small>{{value.trackLen}} 개의 노래 수록</small></div>
                        </div>
                        <div class="col-md-2">

                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div v-if="this.options.musician" class="text-left mb-3">
                <div class="mb-3">
                    <h5><strong>Musician</strong></h5>
                    <small>Found {{musicianResult.length}} musicians.</small>
                </div>

                <div v-for="(value, key) in musicianResult" :key="key">
                    <div class="row">
                        <div class="col-md-3 mr-3">
                            <img class="searchImg" :src="value.songImg">
                        </div>
                        <div class="col-md-7 mr-3">
                            <div><strong>{{value.album}}</strong></div>
                            <div><small>{{value.trackLen}} 개의 노래 수록</small></div>
                        </div>
                        <div class="col-md-2">

                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
        <div class="pt-5" v-else>
            <h2><strong>검색어가 없습니다.</strong></h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import top from '@/components/Nav.vue'

export default {
    name: 'Search',
    components: {
        top,
    },
    data() {
        return {
            keyword: null,
            titles: 0,
            lyrics: 0,
            albums: 0,
            musicians: 0,
            options: {},
            titleResult: [],
            lyricsResult: [],
            albumResult: [],
            musicianResult: [],
        }
    },
    mounted() {
        if (this.$route.query['keyword'] != undefined) this.keyword = this.$route.query['keyword']
        this.options = this.$route.query
        this.searchData()
    },
    methods: {
        async searchData() {
            let res = await axios.post(`/api/music/search/${this.keyword.replaceAll(' ', '-')}`)
            console.log(res)
            if (res.data.success) {
                res.data.result.map(item => {
                    console.log(item)
                    if (item.album.toLowerCase() == this.keyword.toLowerCase()) this.albumResult.push(item)
                    if (item.song.toLowerCase() == this.keyword.toLowerCase()) this.titleResult.push(item)
                    if (item.musician.toLowerCase() == this.keyword.toLowerCase()) this.musicianResult.push(item)
                    // if (item.song.toLowerCase() == this.keyword.toLowerCase()) this.titleResult.push(item)
                })
            }
        }
    }
}
</script>

<style scoped>
.searchImg {
    object-fit: cover;
    height: 120px;
}
</style>