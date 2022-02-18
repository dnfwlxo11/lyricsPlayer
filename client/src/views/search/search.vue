<template>
    <div class="search">
        <top></top>
        <div v-if="keyword" class="container pt-5 pb-5">
            <div class="text-left mb-5">
                <h3><strong>Search results for "{{keyword}}"</strong></h3>
            </div>
            <div v-if="searchOptions.songname" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-post-outline" style="font-size: 30px;"></i>&nbsp;
                        <strong style="font-size: 20px;">Title</strong>
                    </div>
                    <small>Found {{titleResult.length}} songs.</small>
                </div>

                <div v-for="(value, key) in titleResult" :key="key">
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <img class="searchImg" :src="`${value.songimg}`" @click="$router.push(`/music/${value.musician}/${value.songname}`)">
                        </div>
                        <div class="col-md-9">
                            <div><strong @click="$router.push(`/music/${value.musician}/${value.songname}`)">{{value.songname}}</strong></div>
                            <div><small @click="$router.push(`/album/${value.album}`)">{{value.album}}</small></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.lyrics" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-post-outline" style="font-size: 30px;"></i>&nbsp;
                        <strong style="font-size: 20px;">Lyrics</strong>
                    </div>
                    <small>Found {{lyricsResult.length}} songs.</small>
                </div>

                <div v-for="(value, key) in lyricsResult" :key="key">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="searchImg" :src="`${value.songimg}`" @click="$router.push(`/music/${value.musician}/${value.songname}`)">
                        </div>
                        <div class="col-md-9">
                            <div><strong @click="$router.push(`/music/${value.musician}/${value.songname}`)">{{value.songname}}</strong></div>
                            <div class="mb-3"><small @click="$router.push(`/album/${value.album}`)">{{value.album}}</small></div>
                            <div class="mb-3"><span style="font-size: 14px;text-justify: newspaper">{{ (targetName == value.songname) && more ? value.lyrics : value.lyrics.substr(0, 200) + '.....'}} </span></div>
                            <div v-if="targetName == value.songname && more" class="text-right"><i class="mdi mdi-chevron-double-up" style="font-size: 20px;" @click="more=false;targetName=value.songname"></i></div>
                            <div v-else class="text-right"><i class="mdi mdi-chevron-double-down" style="font-size: 20px;" @click="more=true;targetName=value.songname"></i></div>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div v-if="searchOptions.album" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-album" style="font-size: 30px;"></i>&nbsp;
                        <strong style="font-size: 20px;">Album</strong>
                    </div>
                    <small>Found {{albumResult.length}} albums.</small>
                </div>

                <div v-for="(value, key) in albumResult" :key="key">
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <img class="searchImg" :src="`${value.albumimg}`" @click="$router.push(`/album/${value.album}`)">
                        </div>
                        <div class="col-md-9">
                            <div><strong @click="$router.push(`/album/${value.album}`)">{{value.album}}</strong></div>
                            <!-- <div><small>{{value.trackLen}} 개의 노래 수록</small></div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.author" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-account-circle" style="font-size: 30px;"></i>&nbsp;
                        <strong style="font-size: 20px;">Musician</strong>
                    </div>
                    <small>Found {{musicianResult.length}} musicians.</small>
                </div>

                <div v-for="(value, key) in musicianResult" :key="key">
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <img class="searchImg" :src="`${value.musicianimg}`" @click="$router.push(`/musician/${value.musician}`)">
                        </div>
                        <div class="col-md-9">
                            <div><strong @click="$router.push(`/musician/${value.musician}`)">{{value.musician}}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="pt-5 pb-5">
            <h2><strong>검색어가 없습니다.</strong></h2>
        </div>
    </div>
</template>

<script>
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
            targetName: null,
            more: false,
            searchOptions: {},
            titleResult: [],
            lyricsResult: [],
            albumResult: [],
            musicianResult: [],
        }
    },
    mounted() {
        if (this.$route.query['keyword'] != undefined) this.keyword = this.$route.query['keyword']
        this.searchOptions = this.$route.query
        this.searchData()
    },
    methods: {
        async searchData() {
            let res = await this.$Api.post(`/api/search${this.$route.fullPath}`)

            if (res.data.success) {
                if (res.data.success) {
                    res.data.result.map(item => {
                        const _key = Object.keys(item)[0]

                        if (_key == 'album') this.albumResult = item[_key]
                        if (_key == 'songname') this.titleResult = item[_key]
                        if (_key == 'author') this.musicianResult = item[_key]
                        if (_key == 'lyrics') this.lyricsResult = item[_key]
                    })
                }
            }
        }
    }
}
</script>

<style scoped>
.searchImg {
    object-fit: cover;
    height: 150px;
    width: 100%;
}
</style>