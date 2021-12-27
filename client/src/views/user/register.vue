<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header justify-content-center" style="background-color: #6872A6;">
                        <div class="row w-100">
                            <div class="col-1 m-0 p-0"></div>
                            <div class="col-10 d-flex justify-content-center align-items-center">
                                <span>회원가입</span>
                            </div>
                            <div class="col-1 m-0 p-0">
                                <a href="javascript:;" class="btn btn-sm" @click="$emit('on-close')">
                                    <i class="mdi mdi-close"></i>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-body">
                        <div class="mt-4 mb-5">
                            <h5>간단하게 가입할 수 있어요.</h5>
                        </div>
                        <div class="mb-3">
                            <input class="pl-3 id-input" type="text" style="height: 35px; width: 70%" placeholder="아이디를 입력해주세요.">
                            <button class="btn id-btn" style="width: 20%; height: 35px">중복체크</button>
                        </div>
                        <div class="mb-5">
                            <input class="pl-3 mb-3" type="password" style="height: 35px; width: 90%" placeholder="비밀번호를 입력해주세요.">
                            <input class="pl-3" type="password" style="height: 35px; width: 90%" placeholder="비밀번호를 한번 더 입력해주세요.">
                        </div>
                        
                        <div>
                            <button type="button" class="btn btn-sm" @click="$emit('on-confirm')" style="width: 90%; height: 40px;">
                                가입하기!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Register'
    }
</script>

<style lang="scss" scoped>  
    .modal-container {
        max-width: 480px;
        margin-top: 100px;
    }

    .id-input {
        border-radius: 0.5rem 0 0 0.5rem;
    }

    .id-btn {
        border-radius: 0 0.5rem 0.5rem 0;
    }
</style>
