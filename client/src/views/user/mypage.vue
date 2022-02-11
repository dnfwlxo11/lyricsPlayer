<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header justify-content-center" style="background-color: #6872A6;">
                        <div class="row w-100">
                            <div class="col-1 m-0 p-0"></div>
                            <div class="col-10 d-flex justify-content-center align-items-center">
                                <span>내 정보보기</span>
                            </div>
                            <div class="col-1 m-0 p-0">
                                <a href="javascript:;" class="btn btn-sm" @click="$emit('on-close')">
                                    <i class="mdi mdi-close"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body pl-5 pr-5">
                        <div class="mt-4 mb-5">
                            <h5>뒤에 누가 쳐다보는거 같은데? 🤷‍♂️</h5>
                        </div>
                        <div v-if="userInfo">
                            <div class="mb-3">
                                <h6 class="text-left">아이디</h6>
                                <input class="pl-3 id-input w-100" type="text" style="height: 35px;" :value="userInfo.id" disabled>
                            </div>
                            <div class="mb-3">
                                <h6 class="text-left">기존 비밀번호</h6>
                                <input class="pl-3 pass-input w-100" type="password" style="height: 35px;" :value="beforePass" placeholder="기존 비밀번호를 입력해주세요.">
                            </div>
                            <div class="mb-5">
                                <h6 class="text-left">새로운 비밀번호</h6>
                                <input class="pl-3 pass-input w-100" type="password" style="height: 35px;" :value="afterPass" placeholder="변경할 비밀번호를 입력해주세요.">
                            </div>
                            <div>
                                <button type="button" class="btn btn-sm" @click="$emit('on-close')" style="width: 90%; height: 40px;">
                                    적용
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <div class="d-flex justify-content-center align-items-center">
                                <i class="mdi mdi-loading mdi-spin" style="font-size: 24px;"></i>
                                <span>정보 조회 중</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Mypage',
    data() {
        return {
            userInfo: null,
            id: 'xxxxx',
            beforePass: null,
            afterPass: null,
        }
    },
    mounted() {
        this.loadProfile();
    },
    methods: {
        async loadProfile() {
            let res = await axios.post('/api/user/authenticate');

            if (res.data.success) {
                this.userInfo = res.data.result;
            }
        }
    }
}
</script>

<style lang="scss" scoped>  
    .modal-container {
        max-width: 480px;
        margin-top: 100px;
    }

    .pass-input {
        border-radius: 0.5rem 0 0 0.5rem;
    }

    .pass-btn {
        border-radius: 0 0.5rem 0.5rem 0;
    }
</style>