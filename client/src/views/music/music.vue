<template>
    <div class="music">
        <top></top>
        <div class="profile">
            <img class="w-100" :src="require(`@/assets/dummy/${dummy[musicId]}.jpg`)" :alt="dummy[musicId]" style="height: 550px; object-fit: cover;">
        </div>
        <div class="mb-4">
            <div class="row" style="height: 200px;">
                <div class="col-2 h-100 d-flex justify-content-center align-items-center">
                    <img class="musician-img" src="@/assets/dummy/musician.png" alt="대추">
                </div>
                <div class="col-10 h-100 d-flex justify-content-center align-items-center">

                </div>
            </div>
        </div>
        <comments></comments>
    </div>
</template>

<script>
import top from '@/components/Nav.vue'
import comments from '@/views/music/vues/comments.vue'

export default {
    name: 'Music',
    components: {
        top,
        comments,
    },
    data() {
        return {
            musicId: null,
            dummy: { '1': 'persian', '2': 'british', '3': 'scotish', '4': 'russian', '5': 'siam', '6': 'regdoll', 
                     '7': 'cat1', '8': 'cat2', '9': 'cat3', '10': 'cat4', '11': 'cat5', '12': 'cat6' },
        }
    },
    created() {
        this.musicId = this.$route.params.musicId;
    }
}
</script>

<style>
.musician-img {
    height: 70%;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}
</style>