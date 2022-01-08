<template>
    <div class="home">
        <top></top>
        <div class="main">
            <img class="w-100 placeholder-glow" src="@/assets/main.png" alt="메인이미지">
        </div>
        <div class="search w-100 d-flex justify-content-center align-items-center mt-3 mb-3">
            <input class="text-center keyword-input" type="text" placeholder="원하는걸 적어봐" @keypress.enter="$router.push(`/search` + (keyword == '' ? '' : `?keyword=${keyword}`))" v-model="keyword">
            <button class="pr-3 mr-3 mdi mdi-magnify keyword-icon" @click="$router.push(`/search` + (keyword == '' ? '' : `?keyword=${keyword}`))"></button>
            <button class="btn btn-outline-primary">옵션 더보기</button>
        </div>
        <div class="container trend">
            <div class="d-flex justify-content-center align-items-center mb-5" style="font-size: 20px;text-left;height: 15%;"><span>가장 인기있는 노래들을 들어보세요!</span></div>
            <div class="row m-0 p-0">
                <div class="col-md-2 mb-5 album" v-for="(item, idx) of musicianDummy" :key="idx" style="float: left;">
                    <div class="thumbnail card mb-1">
                        <img :src="require(`@/assets/dummy/${musicThumbnail[musicDummy[idx]]}.jpg`)" :alt="`${musicDummy[idx]}`" style="object-fit: cover;" @click="$router.push(`/music/${item}/${musicDummy[idx]}`)" >
                    </div>
                    <div class="text-left">
                        <div class="music-info text-left">
                            <span @click="$router.push(`/music/${item}/${musicDummy[idx]}`)">{{musicDummy[idx].replaceAll('-', ' ')}}</span> <br>
                            <span @click="$router.push(`/musician/${item}`)"><small>{{item.replaceAll('-', ' ')}}</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
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
                musicianDummy: ['Dylan-Emmet', 'RYYZN', 'RYYZN', 'Vince-Miranda', 'Nick-Ray', 'MODUS', 
                    'Kavi-Jezzie-Hockaday', 'Kavi-Jezzie-Hockaday', 'Dylan-Emmet', 'Color-Out', 'Cole-Powell', 'Cole-Powell'],
                musicDummy: ['Some-Things-Dont-Change', 'Secrets', 'Passionate-Affair', 'Mas-Alla', 'Tread-Lightly', 'My-Love', 
                    'Dont-Throw-Your-Light-Away', 'Everyone-Will-Fall-Down', 'Some-Things-Dont-Change', 'Alone', 'Always-Ever-Be', 'Not-the-One-to-Say-I-Told-You-So'],
                musicThumbnail: { 'Some-Things-Dont-Change': 'persian', 'Secrets': 'british', 'Passionate-Affair': 'scotish', 'Mas-Alla': 'russian', 'Tread-Lightly': 'siam', 'My-Love': 'regdoll', 
                        'Dont-Throw-Your-Light-Away': 'cat1', 'Everyone-Will-Fall-Down': 'cat2', 'Some-Things-Dont-Change': 'cat3', 'Alone': 'cat4', 'Always-Ever-Be': 'cat5', 'Not-the-One-to-Say-I-Told-You-So': 'cat6' },
                isRegister: false,
                isLogin: false,
                keyword: '',
            }
        },
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
</style>