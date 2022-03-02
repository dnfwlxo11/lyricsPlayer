<template>
    <div class="search">
        <top></top>
        <div v-if="keyword && aiResult" class="container pt-5 pb-5">
            <div class="search w-100 d-flex justify-content-center align-items-center mt-3 mb-3">
                <input class="text-center keyword-input w-75" type="text" placeholder="원하는걸 적어봐" @keypress.enter="search" v-model="inputKeyword">
                <button class="pr-3 mr-3 mdi mdi-magnify keyword-icon" @click="search"></button>
                <button class="btn btn-outline-primary" @click="moreOption=!moreOption">옵션 보기</button>
            </div>
            <div class="mb-5" style="height: 100px;" v-if="moreOption">
                <div class="card h-100 d-flex justify-content-center align-items-center">
                    <div class="row w-100" @change="setParams">
                        <div class="col-md-3 custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="switch1" v-model="searchOption.songname">
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
                    <small>Found {{aiResult.total}} results.</small>
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
                                <div><small @click="$router.push(`/musician/${value.musician}/${value.mid}`)">{{item.musician}}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.songname" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-post-outline" style="font-size: 30px;"></i>&nbsp;
                        <a id="title"><strong style="font-size: 20px;">Title</strong></a>
                    </div>
                    <small>Found {{this.searchResult.songname.total}} songs.</small>
                </div>
                <div class="mb-5">
                    <div v-for="(value, key) in this.searchResult.songname.result" :key="key">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.songimg}`" @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">{{value.songname}}</strong></div>
                                <div><small @click="$router.push(`/musician/${value.musician}/${value.mid}`)">{{value.musician}}</small></div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3"><hr></div>
                    <div v-if="this.searchResult.songname.result.length < this.searchResult.songname.total" class="mt-3 mb-3 text-center">
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <button class="btn btn-primary w-100" @click="pageNum.songname=pageNum.songname+1;moreLoad('songname')">More</button>
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                    <div v-if="this.searchResult.songname.result.length > 5" class="text-center">
                        <a href="#title">
                            <i class="mdi mdi-arrow-up-drop-circle" style="font-size: 20px;"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.lyrics" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-post-outline" style="font-size: 30px;"></i>&nbsp;
                        <a id="lyric"><strong style="font-size: 20px;">Lyrics</strong></a>
                    </div>
                    <small>Found {{this.searchResult.lyrics.total}} songs.</small>
                </div>
                <div class="mb-5">
                    <div v-for="(value, key) in this.searchResult.lyrics.result" :key="key">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.songimg}`" @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/music/${value.musician}/${value.songname}/${value.sid}`)">{{value.songname}}</strong></div>
                                <div class="mb-3"><small @click="$router.push(`/musician/${value.musician}/${value.mid}`)">{{value.musician}}</small></div>
                                <!-- <div class="mb-3"><small @click="$router.push(`/album/${value.album}/${value.aid}`)">{{value.album}}</small></div> -->
                                <div class="mb-3"><span style="font-size: 14px;text-justify: newspaper">{{ (targetName == value.songname) && more ? value.lyrics : `${value.lyrics.substr(0, 200)} .....`}} </span></div>
                                <div v-if="targetName == value.songname && more" class="text-right"><i class="mdi mdi-chevron-double-up" style="font-size: 20px;" @click="more=false;targetName=value.songname"></i></div>
                                <div v-else class="text-right"><i class="mdi mdi-chevron-double-down" style="font-size: 20px;" @click="more=true;targetName=value.songname"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3"><hr></div>
                    <div v-if="this.searchResult.lyrics.result.length < this.searchResult.lyrics.total" class="mt-3 mb-3 text-center">
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <button class="btn btn-primary w-100" @click="pageNum.lyrics=pageNum.lyrics+1;moreLoad('lyrics')">More</button>
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                    <div v-if="this.searchResult.lyrics.result.length > 5" class="text-center">
                        <a href="#lyric">
                            <i class="mdi mdi-arrow-up-drop-circle" style="font-size: 20px;"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.album" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-album" style="font-size: 30px;"></i>&nbsp;
                        <a id="album"><strong style="font-size: 20px;">Album</strong></a>
                    </div>
                    <small>Found {{this.searchResult.album.total}} albums.</small>
                </div>
                <div class="mb-5">
                    <div v-for="(value, key) in this.searchResult.album.result" :key="key">
                        <hr>
                        <div class="row">
                            <div class="col-md-3">
                                <img class="searchImg" :src="`${value.albumimg}`" @click="$router.push(`/album/${value.album}/${value.aid}`)">
                            </div>
                            <div class="col-md-9">
                                <div><strong @click="$router.push(`/album/${value.album}/${value.aid}`)">{{value.album}}</strong></div>
                                <div class="mb-3"><small @click="$router.push(`/musician/${value.musician}/${value.mid}`)">{{value.musician}}</small></div>
                                <!-- <div><small>{{value.trackLen}} 개의 노래 수록</small></div> -->
                            </div>
                        </div>
                    </div>
                    <div class="mb-3"><hr></div>
                    <div v-if="this.searchResult.album.result.length < this.searchResult.album.total" class="mt-3 mb-3 text-center">
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <button class="btn btn-primary w-100" @click="pageNum.album=pageNum.album+1;moreLoad('album')">More</button>
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                    <div v-if="this.searchResult.album.result.length > 5" class="text-center">
                        <a href="#album">
                            <i class="mdi mdi-arrow-up-drop-circle" style="font-size: 20px;"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="searchOptions.musician" class="text-left mb-5">
                <div class="mb-3">
                    <div class="d-flex align-items-center">
                        <i class="mdi mdi-account-circle" style="font-size: 30px;"></i>&nbsp;
                        <a href="#musician"><strong style="font-size: 20px;">Musician</strong></a>
                    </div>
                    <small>Found {{this.searchResult.musician.total}} musicians.</small>
                </div>
                <div class="mb-3"><hr></div>
                <div class="mb-5">
                    <div v-for="(value, key) in this.searchResult.musician.result" :key="key">
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
                    <div v-if="this.searchResult.musician.result.length < this.searchResult.musician.total" class="mt-3 mb-3 text-center">
                        <hr>
                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-8">
                                <button class="btn btn-primary w-100" @click="pageNum.musician=pageNum.musician+1;moreLoad('musician')">More</button>
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </div>
                    <div v-if="this.searchResult.musician.result.length > 5" class="text-center">
                        <a id="musician">
                            <i class="mdi mdi-arrow-up-drop-circle" style="font-size: 20px;"></i>
                        </a>
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
            inputKeyword: null,
            keyword: null,
            moreOption: false,
            pageNum: {
                songname: 0,
                lyrics: 0,
                album: 0,
                musician: 0,
            },
            searchOption: {
                songname: true, lyrics: true, musician: true, album: true,
            },
            searchResult: {
                songname: { result: [], total: 0 },
                lyrics: { result: [], total: 0 },
                album: { result: [], total: 0 },
                musician: { result: [], total: 0 },
            },
            targetName: null,
            more: false,
            searchOptions: {},
            aiResult: [],
        }
    },
    mounted() {
        if (this.$route.query['keyword'] != undefined) {
            this.keyword = this.$route.query['keyword'];
            this.inputKeyword = this.$route.query['keyword'];
        }
        this.searchOptions = this.$route.query

        // this.aiSearch()
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
                        // let newFullPath = this.$route.fullPath.replace(`keyword=${this.keyword}`, `keyword=${item[0].replaceAll(' ', '-')}`)
                        let res = await this.$Api.post(`/api/search/${item[0]}`);

                        if (res.data.success) {
                            Object.keys(res.data.result).map(key => {
                                const item = res.data.result[key]

                                if (key == 'album') result = result.concat(item);
                                if (key == 'songname') result = result.concat(item);
                                if (key == 'musician') result = result.concat(item);
                                if (key == 'lyrics') result = result.concat(item);
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

        initState() {
            this.titles = 0;
            this.lyrics = 0;
            this.albums = 0;
            this.musicians = 0;
            this.titleResult = [];
            this.lyricsResult = [];
            this.albumResult = [];
            this.musicianResult = [];
        },

        search() {
            if (!this.inputKeyword || this.keyword == this.inputKeyword) return;

            this.$router.replace({ path: `/search?keyword=${this.inputKeyword}${this.setParams()}`}, () => {});
            this.initState();
            this.keyword = this.inputKeyword;
            this.searchData();
        },

        setParams() {
            let params = `${this.searchOption.songname ? '&songname=true' : ''}${this.searchOption.lyrics ? '&lyrics=true' : ''}${this.searchOption.musician ? '&musician=true' : ''}${this.searchOption.album ? '&album=true' : ''}`
            return params;
        },

        async searchData() {
            let res = await this.$Api.post(`/api/search${this.$route.fullPath}`);

            if (res.data.success) {
                Object.keys(res.data.result).map(key => {
                    const item = res.data.result[key];

                    this.searchResult[key].result.length ? this.searchResult[key].result.concat(item.result) : this.searchResult[key] = item;
                });
            }
        },

        async moreLoad(option) {
            let res = await this.$Api.post(`/api/search/search?keyword=${this.keyword}&${option}=true&pageNum=${this.pageNum[option]}`);

            this.searchResult[option].result = this.searchResult[option].result.concat(res.data.result[option].result);
        }
    }
}
</script>

<style scoped>
a:link { 
    color: #3C3D59;
    text-decoration: none;
    cursor: default;
}

a:visited { 
    color: #3C3D59;
    text-decoration: none;
    cursor: default;
}

a:hover { 
    color: #3C3D59;
    text-decoration: none;
    cursor: default;
}

.search {
    height: 100px;
}

.searchImg {
    object-fit: cover;
    height: 150px;
    width: 100%;
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
</style>