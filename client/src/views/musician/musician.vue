<template>
    <div class="musician">
        <top></top>
        <div class="container">
            <div class="row" style="height: 250px;">
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <img class="musician-img" :src="require(`@/assets/dummy/musician.png`)" alt="">
                </div>
                <div class="col-9 d-flex justify-content-start align-items-center">
                    <div class="text-left">
                        <div><h2>{{musician}}</h2></div>
                        <div><h6>2개의 앨범</h6></div>
                        <div><h6>12개의 노래</h6></div>
                    </div>
                </div>
            </div>
            <div>
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-post-outline mr-2" style="font-size: 30px;"></i>
                    <span>12 songs</span>
                </div>
            </div>
            <hr>
            <div v-for="(item, key) in dummy" :key=key class="mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="song-img" :src="require(`@/assets/dummy/${item}.jpg`)" alt="대추" @click="$router.push(`/music/${key}`)">
                    </div>
                    <div class="col-md-9 text-left pt-3 pb-3">
                        <div class="row h-75 pl-3 pr-3">
                            <div>
                                <h5 class="m-0" @click="$router.push(`/music/${key}`)">{{item}}</h5>
                                <small>{{musician}}</small>
                            </div>
                        </div>
                        <div class="row h-25 pl-3 pr-3">
                            <div class="d-flex justify-content-start align-items-end" style="font-size: 15px;">
                                <div><i class="mdi mdi-likes"></i><span>좋아요🙆‍♀️🙆‍♂️ 780개</span></div>,&nbsp;
                                <div><span>구독👆 70개</span></div>    
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
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
            musician: '',
            dummy: { '1': 'persian', '2': 'british', '3': 'scotish', '4': 'russian', '5': 'siam', '6': 'regdoll', 
                     '7': 'cat1', '8': 'cat2', '9': 'cat3', '10': 'cat4', '11': 'cat5', '12': 'cat6' },
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.musician = this.$route.params.musicianId;
    }
}
</script>

<style scope>
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