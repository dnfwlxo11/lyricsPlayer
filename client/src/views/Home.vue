<template>
    <div class="home">
        <top></top>
        <div class="main">
            <img class="w-100" src="@/assets/main.png" alt="메인이미지">
        </div>
        <div class="search w-100 d-flex justify-content-center align-items-center mt-3 mb-3">
            <input class="mr-3 text-center" type="text" placeholder="원하시는 키워드를 입력해주세요." style="width: 40%;height: 40%;">
            <button class="btn btn-outline-primary">옵션 더보기</button>
        </div>
        <div class="trend">
            <div class="d-flex justify-content-center align-items-center mb-5" style="font-size: 20px;text-left;height: 15%;"><span>가장 인기많은 노래들을 들어보세요!</span></div>
            <div class="row m-0 p-0">
                <div class="col-md-4 mb-5" v-for="(item, idx) of dummy" :key="idx" style="float: left;">
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
                dummy: [ 'persian', 'british', 'scotish', 'russian', 'siam', 'regdoll' ]
            }
        }
    }
</script>

<style>
    .search {
        height: 100px;
    }

    .trend {
        padding-left: 5%;
        margin-bottom: 100px;
        height: 600px;
    }

    .album, .album > img{
        width: 200px;
        height: 200px;
    }

    .line {
        border-bottom: 2px solid grey;
        opacity: 0.2;
        padding-left: 5%;
        padding-right: 5%;
    }
</style>