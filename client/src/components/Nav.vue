<template>
    <div class="nav" style="margin-bottom: 55px;">
        <div class="top">
            <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #3C3D59;">
                <span class="pl-3 text-left w-50">
                    <a style="font-size:1.25rem; color: white;" @click="$router.push('/', () => {}, () => { $router.go(); })">
                        <img class="logo mr-3" src="/images/logo.png" alt="lyricsPlayer">𝒍𝒚𝒓𝒊𝒄𝒔𝑷𝒍𝒂𝒚𝒆𝒓
                    </a>
                </span>
                <button class="navbar-toggler pr-3" type="button" data-toggle="collapse" data-target="#target"
                    aria-controls="target" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="target">
                    <div v-if="!loginState" class="p-2 mr-0 pr-0 mb-0 text-right ml-auto">
                        <button class="nav-item btn mr-3" @click="isRegister=true">회원가입</button>
                        <button class="nav-item btn" @click="$store.commit('setUserLogin', true)">로그인</button>
                    </div>
                    <div v-else class="p-2 mr-0 pr-0 mb-0 text-right ml-auto">
                        <button class="nav-item btn mr-3" @click="$router.push('/upload')">노래 올리기</button>
                        <button class="nav-item btn mr-3" @click="showMypage">내 정보</button>
                        <button class="nav-item btn mr-3" @click="logout">로그아웃</button>
                    </div>
                </div>
            </nav>
        </div>
        <mypage v-if="isMypage" @on-close="isMypage=false" @on-confirm="isMypage=false;"></mypage>
        <register v-if="isRegister" @on-close="isRegister=false" @on-confirm="isRegister=false;register($event)"></register>
        <login v-if="$store.getters.getUserLogin" @on-close="$store.commit('setUserLogin', false);$emit('not-auth')" @on-confirm="$store.commit('setUserLogin', false);login()" ></login>
    </div>
</template>

<script>
import mypage from '@/views/user/mypage.vue';
import register from '@/views/user/register.vue';
import login from '@/views/user/login.vue';

export default {
    name: 'Nav',
    props: {
        popDialog: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        mypage,
        register,
        login,
    },
    data() {
        return {
            isMypage: false,
            isLogin: false,
            isRegister: false,
            registerData: null,
            loginState: false,
            loginErr: false,
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        async register(data) {
            let res = await this.$Api.post('/api/user/register', data);
        },

        login() {
            this.loginState = true;
        },

        logout() {
            this.$cookies.remove('x_auth');
            this.$store.commit('setUserLogin', false);
            this.loginState = false;
            this.$router.replace('/', () => {}, () => {
                window.location.reload();
            });
        },

        showMypage() {
            this.isMypage = true;
        },

        checkAuth() {
            let token = this.$cookies.get('x_auth');
            
            if (token) this.loginState = true;
            else this.loginState = false;
        },
    },
    watch: {
        popDialog() {
            this.isLogin = this.popDialog;
        }
    }
}
</script>

<style>
    a:link {
        color: black;
        text-decoration: none;
    }

    a:visited {
        color: black;
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
    }

    .top {
        width: 100%;
    }

    .logo {
        height: 30px;
    }

    .navbar {
        border-color: white;
        color: white;
    }
</style>