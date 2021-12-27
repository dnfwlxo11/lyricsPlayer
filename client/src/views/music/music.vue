<template>
    <div class="music">
        <top></top>
        <div class="container p-0" style="min-width: 1000px;">
            <div class="profile">
                <img class="w-100" :src="require(`@/assets/dummy/${dummy[musicId]}.jpg`)" :alt="dummy[musicId]" style="height: 550px; object-fit: cover;">
            </div>
            <div class="mb-5">
                <div class="row m-0 p-0" style="height: 150px;">
                    <div class="col-2 m-0 p-0 h-100 d-flex justify-content-center align-items-center">
                        <img class="musician-img" src="@/assets/dummy/musician.png" alt="대추">
                    </div>
                    
                    <div class="col-10 m-0 p-0">
                        <i class="mr-3 mdi mdi-arrow-right-drop-circle-outline" style="font-size: 65px;float: left;"></i>
                        <div class="row m-0 p-0 mb-2 mt-3 text-left"><h3 class="m-0 p-0">{{dummy[musicId]}}</h3></div>
                        <div class="row m-0 p-0 text-left"><small class="m-0 p-0"> 대추</small></div>
                        <div>
                            <progress value="30" max="100" style="height: 50px;width: 100%;"></progress>
                        </div>
                    </div>
                </div>
            </div>
            <comments></comments>
        </div>
        
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
progress {
    border-radius: 0;
    color: #3C3D59;
    border: 1px solid lightgrey;
}

progress::-webkit-progress-value {
    background-color: #F2D4C9;
}

progress::-webkit-progress-bar {
    background-color: white;
}

.musician-img {
    height: 100px;
    width: 100px;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}
</style>