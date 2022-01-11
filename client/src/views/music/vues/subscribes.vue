<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header justify-content-center" style="background-color: #6872A6;">
                        <div class="row w-100">
                            <div class="col-1 m-0 p-0"></div>
                            <div class="col-10 d-flex justify-content-center align-items-center">
                                <span>구독하는 사람들</span>
                            </div>
                            <div class="col-1 m-0 p-0">
                                <a href="javascript:;" class="btn btn-sm" @click="$emit('on-close')">
                                    <i class="mdi mdi-close"></i>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-body">
                        <div>
                            <div>
                                <div class="ml-3" style="height: 100px;">
                                    <img class="subscribe-img mr-3" src="/images/british.jpg" style="float: left;">
                                    <div class="h-100 text-left">
                                        <div><h3><strong>{{title}}</strong></h3></div>
                                        <div><h5><small>{{musician}}</small></h5></div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <div class="row" style="overflow-y: auto;max-height: 250px;">
                                <div class="col-md-2 mb-2" v-for="(item, idx) of subscribeDummy" :key="idx">
                                    <img class="subscribe-user-img m-1" src="/images/user.png" alt="">
                                    {{item}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Subscribes',
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
            subscribeDummy: ['신뢰성', '확장성', '부하', '발전소', '항공', '교통', '신뢰성', '확장성', '부하', '발전소', '항공', '교통', '신뢰성', '확장성', '부하', '발전소', '항공', '교통', '신뢰성', '확장성', '부하', '발전소', '항공', '교통']
        }
    }
}
</script>

<style scoped>
.subscribe-img {
    border-radius: 0;
    height: 100px;
    width: 100px;
}

.subscribe-user-img {
    height: 60px;
    width: 60px;
}
</style>