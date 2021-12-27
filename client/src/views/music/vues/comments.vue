<template>
    <div class="comments">
        <div class="text-left">
            <div class="row h-100 d-flex justify-content-center align-items-center">
                <div class="col-2"><h2><strong>Comment</strong></h2></div>
                <div class="col-10">
                    <input class="pl-3 comment-input" type="text" style="width: 80%;height: 45px;">
                    <button class="btn comment-btn" style="width: 20%;height: 45px;">등록</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comments'
}
</script>

<style>
.comment-input {
    border-radius: 0.5rem 0 0 0.5rem;
}

.comment-btn {
    border-radius: 0 0.5rem 0.5rem 0;
}
</style>