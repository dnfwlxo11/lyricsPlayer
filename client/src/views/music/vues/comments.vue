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
                    <div v-if="commentLen == null">
                        <div><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                    </div>
                    <div v-else>
                        <span>{{commentLen}} comments</span>
                    </div>
                    
                </div>
                <hr>
                <div v-if="commentLen == null" class="text-center">
                    <div class="pt-3">
                        <i class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></i>
                    </div>
                </div>
                <div v-else class="h-100">
                    <div v-for="(value, key) in comments" :key="key">
                        <div class="row mb-3">
                            <div class="col-1 m-auto">
                                <img class="comment-img" :src="`/images/user.png`" alt="대추">
                            </div>
                            <div class="col-10 m-auto">
                                <div>
                                    <strong>{{value.userName}}</strong>&nbsp;
                                    <small>{{$Utils.dateFormat(new Date(value.time), 'yyyy.MM.dd HH:mm:ss')}}</small>
                                    <small v-if="value.is_edited == '1'"> (수정됨)</small>
                                </div>
                                <div>
                                    <div v-if="isEdit && targetCid == value.cid">
                                        <div class="h-100">
                                            <textarea class="p-2 comment-input" style="width: 100%;" type="text" v-model="value.comment" />
                                        </div>
                                        <div class="text-right">
                                            <button class="mr-3 btn btn-danger" @click="isEdit=false">취소</button>
                                            <button class="mr-3 btn btn-primary" @click="modifyComment(value.cid, value.comment)">수정</button>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <small>{{value.comment}}</small>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isEdit && targetCid == value.cid" class="col-1 h-100 text-right"></div>
                            <div v-else-if="userInfo && (userInfo.uid == value.uid)" class="col-1 h-100 text-right">
                                <i class="mdi mdi-pencil-outline" style="font-size: 20px;" @click="isEdit=true;targetCid=value.cid"></i>
                                <i class="mdi mdi-delete-outline" style="font-size: 20px;" @click="deleteComment(value.cid)"></i>
                            </div>
                            <div v-else class="col-1 h-100"></div>
                        </div>
                        <hr>
                    </div>
                    <div v-if="commentLen != comments.length" class="h-100 text-center mb-3">
                        <div v-if="isLoading"><i class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></i></div>
                        <button v-else class="btn btn-primary" @click="currPage+=1;getComments()">더보기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comments',
    data() {
        return {
            userInfo: null,
            commentLen: null,
            comments: [],
            comment: '',
            isEdit: false,
            isLoading: false,
            targetCid: null,
            pageSize: 5,
            currPage: 0,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            await this.loadProfile();
            await this.getCommentCnt();
            await this.getComments();
        },

        async getCommentCnt() {
            let sendData = { 
                'songName': this.$route.params.musicName.replaceAll('-', ' '),
            }

            let res = await this.$Api.post('/api/comment/commentCnt', sendData)

            if (res.data.success) this.commentLen = res.data.result.commentLen;
        },

        async getComments() {
            this.isLoading = true;

            let sendData = { 
                'songName': this.$route.params.musicName.replaceAll('-', ' '),
                'pageSize': this.pageSize,
                'currPage': this.currPage,
                'cid': this.comments.length ? this.comments[this.comments.length - 1].cid : 0,
            }

            let res = await this.$Api.post('/api/comment/comments', sendData);

            if (res.data.success) {
                this.comments = this.comments.concat(res.data.result);
            }

            this.isLoading = false;
        },

        async submitComment() {
            if (this.$cookies.get('x_auth') != null) {
                if (this.comment == '') return true;

                let sendData = {
                    songName: this.$route.params.musicName.replaceAll('-', ' '),
                    content: this.comment,
                    submitDate: (new Date).getTime(),
                };

                let res = await this.$Api.post('/api/comment/submit', sendData);

                if (res.data.success) {
                    this.comment = '';
                    this.getComments();
                    this.getCommentCnt();
                }

                return true;
            } else {
                this.$emit('on-login');
            }
        },

        async modifyComment(cid, comment) {
            if (this.$cookies.get('x_auth') != null) {
                let sendData = {
                    'songName': this.$route.params.musicName.replaceAll('-', ' '),
                    'cid': cid,
                    'modifyComment': comment
                }

                let res = await this.$Api.post('/api/comment/modify', sendData);

                if (res.data.success) {
                    this.isEdit = false;
                }

                return true;
            } else {
                this.$emit('on-login');
            }
        },

        async deleteComment(cid) {
            if (this.$cookies.get('x_auth') != null) {
                let sendData = {
                    'songName': this.$route.params.musicName.replaceAll('-', ' '),
                    'cid': cid,
                }

                let res = await this.$Api.post('/api/comment/delete', sendData);

                if (res.data.success) {
                    this.comments = this.comments.reduce((acc, item) => {
                        if (item.cid != cid) acc.push(item)
                        return acc
                    }, [])

                    await this.getCommentCnt();
                }

                return true;
            } else {
                this.$emit('on-login');
            }
        },

        async loadProfile() {
            let res = await this.$Api.post('/api/user/authenticate');

            if (res.data.success) {
                this.userInfo = res.data.result;
            } else {
                this.userInfo = null;
            }
        },
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