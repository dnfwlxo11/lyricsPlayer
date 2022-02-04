<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header justify-content-center" style="background-color: #6872A6;">
                        <div class="row w-100">
                            <div class="col-1 m-0 p-0"></div>
                            <div class="col-10 d-flex justify-content-center align-items-center">
                                <span>좋아하는 사람들</span>
                            </div>
                            <div class="col-1 m-0 p-0">
                                <a href="javascript:;" class="btn btn-sm" @click="$emit('on-close')">
                                    <i class="mdi mdi-close"></i>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-body h-100">
                        <div class="row ml-3" style="height: 120px;">
                            <div class="col-3 mr-0 pr-0">
                                <img class="like-img mr-3" src="/images/british.jpg" style="float: left;">
                            </div>
                            <div class="col-9 text-left">
                                <div><h3><strong>{{title}}</strong></h3></div>
                                <div><h5><small>{{musician}}</small></h5></div>
                            </div>
                        </div>
                        <hr>
                        <div class="row" style="overflow-y: auto;height: 100%;">
                            <div v-if="likePeople == null" class="w-100 d-flex justify-content-center" >
                                <div><i class="spinner-border" style="width: 4rem; height: 4rem;" role="status"></i></div>
                            </div>
                            <div v-else class="col-md-2 mb-2" v-for="(item, idx) of likePeople" :key="idx">
                                <img class="like-user-img m-1" src="/images/user.png" alt=""> <br>
                                {{item.id}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Likes',
    props: {    
        title: {
            type: String,
            default: ''
        },
        musician: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            likeDummy: ['신뢰성', '확장성', '부하', '발전소', '항공', '교통', '신뢰성', '확장성', '부하', '발전소', '항공', '교통', '신뢰성', '확장성', '부하', '발전소', '항공', '교통', '신뢰성', '확장성', '부하', '발전소', '항공', '교통'],
            likePeople: null,
            currPage: 0,
            pageSize: 10,
        }
    },
    mounted() {
        this.getLikeCount();
    },
    methods: {
        async getLikeCount() {
            let sendData = {
                songName: this.$route.params.musicName.replaceAll('-', ' '),
                pageSize: this.pageSize,
                currPage: this.currPage,
            }

            let res = await axios.post('/api/music/likeCnt', sendData);

            if (res.data.success) {
                this.likePeople = res.data.result;
            }
        }
    }
}
</script>

<style scoped>
.like-img {
    border-radius: 0;
    height: 110px;
    width: 110px;
}

.like-user-img {
    height: 60px;
    width: 60px;
}

.modal-container {
    max-width: 600px;
    height: 500px;
    margin-top: 100px;
}
</style>