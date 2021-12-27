<template>
    <div class="home">
        <top></top>
        <div class="main">
            <img class="w-100 placeholder-glow" src="@/assets/main.png" alt="메인이미지">
        </div>
        <div class="search w-100 d-flex justify-content-center align-items-center mt-3 mb-3">
            <input class="text-center keyword-input" type="text" placeholder="원하는걸 적어봐">
            <button class="pr-3 mr-3 mdi mdi-magnify keyword-icon"></button>
            <button class="btn btn-outline-primary">옵션 더보기</button>
        </div>
        <div class="container trend">
            <div class="d-flex justify-content-center align-items-center mb-5" style="font-size: 20px;text-left;height: 15%;"><span>가장 인기있는 노래들을 들어보세요!</span></div>
            <div class="row m-0 p-0">
                <div class="col-md-2 mb-5" v-for="(item, idx) of dummy" :key="idx" style="float: left;">
                    <div class="album card">
                        <img class="" :src="require(`@/assets/dummy/${item}.jpg`)" :alt="`${item}`" style="object-fit: cover;">
                    </div>
                    <div class="text-left">
                        {{item}} <br>
                        <small>대추</small>
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
            bottom
        },
        data() {
            return {
                dummy: [ 'persian', 'british', 'scotish', 'russian', 'siam', 'regdoll', 'cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6' ]
            }
        }
    }
</script>

<style>
    .search {
        height: 100px;
    }

    .keyword-input {
        background-color: #F2F2F2;
        color: #A599B0;
        border: none;
        outline: none;
        /* border-radius: 0.5rem; */
        width: 40%;
        height: 40%;
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

    .album, .album > img{
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
</style>