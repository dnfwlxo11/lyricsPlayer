<template>
    <div class="comments mb-3 pl-2 pr-2">
        <div class="text-left">
            <div class="row h-100 d-flex justify-content-start align-items-center mb-5">
                <div class="col-md-2 mb-3"><h2 class="m-0 p-0"><strong>Comment</strong></h2></div>
                <div class="col-md-10">
                    <textarea class="p-2 comment-input" type="text" style="width: 85%;height: 45px;float: left" v-model="comment" />
                    <button class="btn comment-btn" style="width: 15%;height: 45px;" @click="submitComment">등록</button>
                </div>
            </div>
            <div class="text-left m-0 p-0">
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-message mr-2" style="font-size: 30px;"></i>
                    <span>{{comments.length}} comments</span>
                </div>
                <hr>
                <div class="h-100" v-for="(value, key) in comments" :key="key">
                    <div class="row mb-3">
                        <div class="col-1 m-auto">
                            <img class="comment-img" :src="`/images/user.png`" alt="대추">
                        </div>
                        <div class="col-9 m-auto">
                            {{value.comment}}
                        </div>
                        <div class="col-2 h-100 text-right">
                            <i class="mdi mdi-pencil-outline"></i>
                            <i class="mdi mdi-delete-outline"></i>
                            <div><small>1 hours ago</small></div>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Comments',
    data() {
        return {
            comments: [],
            comment: '',
        }
    },
    mounted() {
        this.getComments();
    },
    methods: {
        async getComments() {
            let res = await axios.post('/api/comment/comments', { 'songName': this.$route.params.musicName.replaceAll('-', ' ') })

            if (res.data.success) {
                console.log(res.data)
                this.comments = res.data.result;
            }
        },

        async submitComment() {
            if (sessionStorage.getItem('x_auth') != null) {
                if (this.comment == '') return true;

                let sendData = {
                    songName: this.$route.params.musicName.replaceAll('-', ' '),
                    userId: 1,
                    content: this.comment,
                };

                let res = await axios.post('/api/comment/submit', sendData);

                if (res.data.success) {
                    this.comment = '';
                    this.getComments();
                }

                return true;
            } else {
                this.$emit('on-login');
            }
        }
    }
}
</script>

<style>
.comment-input {
    border: none;
    background-color: #F2F2F2;
    border-radius: 0.5rem 0 0 0.5rem;
    overflow: hidden;
    resize: none;
    outline: none;
}

.comment-btn {
    border-radius: 0 0.5rem 0.5rem 0;
}

.comment-img {
    min-width: 30px;
    width: 90%;
    border-radius: 70%;
}
</style>