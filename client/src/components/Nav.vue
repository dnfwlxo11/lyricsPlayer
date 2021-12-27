<template>
    <div class="nav" style="margin-bottom: 55px;">
        <div class="top">
            <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #3C3D59;">
                <span class="pl-3 text-left w-50">
                    <a href="/" style="font-size:1.25rem; color: white;">
                        <img class="logo mr-3" :src="require('@/assets/logo.png')" alt="lyricsPlayer">𝒍𝒚𝒓𝒊𝒄𝒔𝑷𝒍𝒂𝒚𝒆𝒓
                    </a>
                </span>
                <button class="navbar-toggler pr-3" type="button" data-toggle="collapse" data-target="#target"
                    aria-controls="target" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="target">
                    <div class="p-2 mr-0 pr-0 mb-0 text-right ml-auto">
                        <button class="nav-item btn mr-3" @click="isRegister=true">회원가입</button>
                        <button class="nav-item btn" @click="isLogin=true">로그인</button>
                    </div>
                </div>
            </nav>
        </div>
        <register v-if="isRegister" @on-close="isRegister=false" @on-confirm="isRegister=false"></register>
        <login v-if="isLogin" @on-close="isLogin=false" @on-confirm="isLogin=false"></login>
    </div>
</template>

<script>
    import register from '@/views/user/register.vue'
    import login from '@/views/user/login.vue'

    export default {
        name: 'Nav',
        components: {
            register,
            login
        },
        data() {
            return {
                isRegister: false,
                isLogin: false,
            }
        },
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