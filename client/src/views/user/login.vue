<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header justify-content-center" style="background-color: #6872A6;">
                        <div class="row w-100">
                            <div class="col-1 m-0 p-0"></div>
                            <div class="col-10 d-flex justify-content-center align-items-center">
                                <span>로그인</span>
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
                            <h5>반가워요 😊</h5>
                            <h6 v-if="loginErr" class="text-danger">가입하지 않았거나<br>아이디 또는 비밀번호가 틀렸어요!</h6>
                        </div>
                        <div class="mb-3">
                            <input class="pl-3 id-input" type="text" style="height: 35px; width: 90%" placeholder="아이디를 입력해주세요." v-model="registerData.id" >
                        </div>
                        <div class="mb-5">
                            <input class="pl-3 mb-3" type="password" style="height: 35px; width: 90%" placeholder="비밀번호를 입력해주세요." v-model="registerData.password">
                        </div>
                        
                        <div>
                            <button type="button" class="btn btn-sm" @click="login()" style="width: 90%; height: 40px;">
                                자 드가자
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
    name: 'Login',
    data() {
        return {
            registerData: {},
            loginErr: false,
            redirect: null,
        }
    },
    mounted() {
        this.redirect = this.$route.query.redirect;
    },
    methods: {
        async login() {
            let res = await this.$Api.post('/api/user/login', this.registerData);
            if (res.data.success) {
                this.$cookies.set('x_auth', res.data.token);

                this.loginErr = false;

                if (this.redirect) this.$router.push({ path: this.redirect});
                else this.$emit('on-confirm', true)
            } else {
                this.loginErr = true;
            }
        },
    },
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