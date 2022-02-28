<template>
    <div class="search">
        <top></top>
        <div v-if="keyword && aiResult" class="container pt-5 pb-5">
            <div class="text-left mb-5">
                <h3><strong>Search results for "{{keyword}}"</strong></h3>
            </div>
            <div v-if="aiResult.length" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <span style="font-size: 30px;">🧐</span>&nbsp;
                        <!-- <span style="font-size: 30px;">🥰😔😠😀🙄😐</span>&nbsp; -->
                        <strong style="font-size: 20px;">I Think, What you want is this!</strong>    
                    </div>
                    <!-- <strong style="font-size: 20px;">너는 지금 우울하구나. 이 노래는 어때?</strong> <br>
                    <strong style="font-size: 20px;">기분좋은 날. 더 신나보자!</strong> <br> -->
                    <small>Found {{aiResult.length}} results.</small>
                </div>
                <div class="mb-5">
                    <div v-for="(item, idx) of aiResult" :key="idx">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${item.songimg}`" @click="$router.push(`/music/${item.musician}/${item.songname}/${item.sid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/music/${item.musician}/${item.songname}/${item.sid}`)">{{item.songname}}</strong></div>
                                <div><small @click="$router.push(`/album/${item.album}/${item.aid}`)">{{item.album}}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.songname" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-post-outline" style="font-size: 30px;"></i>&nbsp;
                        <strong style="font-size: 20px;">Title</strong>
                    </div>
                    <small>Found {{titleResult.length}} songs.</small>
                </div>
                <div class="mb-5">
                    <div v-for="(value, key) in titleResult" :key="key">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.songimg}`" @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">{{value.songname}}</strong></div>
                                <div><small @click="$router.push(`/album/${value.album}/${value.aid}`)">{{value.album}}</small></div>
                            </div>
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
                <div class="mb-5">
                    <div v-for="(value, key) in lyricsResult" :key="key">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.songimg}`" @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">{{value.songname}}</strong></div>
                                <div class="mb-3"><small @click="$router.push(`/album/${value.album}/${value.aid}`)">{{value.album}}</small></div>
                                <div class="mb-3"><span style="font-size: 14px;text-justify: newspaper">{{ (targetName == value.songname) && more ? value.lyrics : value.lyrics.substr(0, 200) + '.....'}} </span></div>
                                <div v-if="targetName == value.songname && more" class="text-right"><i class="mdi mdi-chevron-double-up" style="font-size: 20px;" @click="more=false;targetName=value.songname"></i></div>
                                <div v-else class="text-right"><i class="mdi mdi-chevron-double-down" style="font-size: 20px;" @click="more=true;targetName=value.songname"></i></div>
                            </div>
                        </div>
                        <hr>
                    </div>
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
                <div class="mb-5">
                    <div v-for="(value, key) in albumResult" :key="key">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.albumimg}`" @click="$router.push(`/album/${value.album}/${value.aid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/album/${value.album}/${value.aid}`)">{{value.album}}</strong></div>
                                <!-- <div><small>{{value.trackLen}} 개의 노래 수록</small></div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.musician" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-account-circle" style="font-size: 30px;"></i>&nbsp;
                        <strong style="font-size: 20px;">Musician</strong>
                    </div>
                    <small>Found {{musicianResult.length}} musicians.</small>
                </div>
                <div class="mb-5">
                    <div v-for="(value, key) in musicianResult" :key="key">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.musicianimg}`" @click="$router.push(`/musician/${value.musician}/${value.mid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/musician/${value.musician}/${value.mid}`)">{{value.musician}}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="pt-5 pb-5">
            <h2><strong>검색 중이에요!</strong></h2>
            <i class="mdi mdi-loading mdi-spin" style="font-size: 80px;"></i>
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
            aiResult: null,
        }
    },
    mounted() {
        if (this.$route.query['keyword'] != undefined) this.keyword = this.$route.query['keyword']
        this.searchOptions = this.$route.query

        this.aiSearch()
        this.searchData()
    },
    methods: {
        async aiSearch() {
            let auth = await this.$Api.post('/api/user/authenticate')

            if (auth.data.result) {
                let w2v = await this.$Api.get(`/ai/search/w2v/${this.keyword.replaceAll(' ', '-')}`);

                if (w2v.data.success) {
                    let result = []

                    let w2vResult = w2v.data.model_predict.negative.reduce((acc, item) => {
                        acc.push([item[0], item[1]])
                        return acc
                    }, [])
                    
                    for await (let item of w2vResult) {
                        let newFullPath = this.$route.fullPath.replace(`keyword=${this.keyword}`, `keyword=${item[0].replaceAll(' ', '-')}`)
                        let res = await this.$Api.post(`/api/search${newFullPath}`);

                        if (res.data.success) {
                            res.data.result.map(item => {
                                const _key = Object.keys(item)[0]

                                if (_key == 'album') result = result.concat(item[_key]);
                                if (_key == 'songname') result = result.concat(item[_key]);
                                if (_key == 'musician') result = result.concat(item[_key]);
                                if (_key == 'lyrics') result = result.concat(item[_key]);
                            })
                        }
                    }

                    this.aiResult = result.slice(0, 5);
                } else {
                    this.aiResult = [];
                }
            } else {
                this.aiResult = [];
            }
        },

        async searchData() {
            let res = await this.$Api.post(`/api/search${this.$route.fullPath}`);

            if (res.data.success) {
                console.log(res.data.result)

                res.data.result.map(item => {
                    const _key = Object.keys(item)[0]

                    if (_key == 'musician') console.log(item[_key])

                    if (_key == 'album') this.albumResult = item[_key];
                    if (_key == 'musician') this.musicianResult = item[_key];
                    if (_key == 'songname') this.titleResult = item[_key];
                    if (_key == 'lyrics') this.lyricsResult = item[_key];
                })
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