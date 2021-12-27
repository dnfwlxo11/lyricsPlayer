<template>
    <div class="comments mb-3 pl-2 pr-2">
        <div class="text-left">
            <div class="row h-100 d-flex justify-content-start align-items-center mb-5">
                <div class="col-md-2"><h2 class="m-0 p-0"><strong>Comment</strong></h2></div>
                <div class="col-md-10">
                    <textarea class="p-3 comment-input" type="text" style="width: 85%;height: 45px;float: left" />
                    <button class="btn comment-btn" style="width: 15%;height: 45px;">등록</button>
                </div>
            </div>
            <div class="text-left m-0 p-0">
                <div class="mb-3 d-flex align-items-center">
                    <i class="mdi mdi-message mr-2" style="font-size: 30px;"></i>
                    <span>3 comments</span>
                </div>
                <hr>
                <div class="h-100" v-for="(item, idx) of comments" :key="idx">
                    <div class="row mb-3">
                        <div class="col-1 m-auto">
                            <img class="comment-img" :src="require(`@/assets/dummy/fan.png`)" alt="대추">
                        </div>
                        <div class="col-9 m-auto">
                            안녕하세요 노래가 너무 좋아요
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
export default {
    name: 'Comments',
    data() {
        return {
            comments: ['hi', 'good', 'hello']
        }
    },
}
</script>

<style>
.comment-input {
    border: none;
    background-color: #F2F2F2;
    border-radius: 0.5rem 0 0 0.5rem;
    overflow: hidden;
    resize: none;
}

.comment-btn {
    border-radius: 0 0.5rem 0.5rem 0;
}

.comment-img {
    min-width: 30px;
    width: 90%;
    border-radius: 70%;
    border: 0.1rem lightgrey solid;
}
</style>