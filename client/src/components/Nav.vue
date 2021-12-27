<template>
    <div class="nav">
        <div class="top w-100">
            <nav class="navbar navbar-expand-lg navbar-dark pt-3 pb-3 h-100 w-100" style="background-color: #3C3D59;">
                <span class="pl-3 text-left w-50"><a href="/" style="font-size:1.25rem; color: white;"><img class="logo mr-3" :src="require('@/assets/logo.png')" alt="lyricsPlayer">𝒍𝒚𝒓𝒊𝒄𝒔𝑷𝒍𝒂𝒚𝒆𝒓</a></span>
                <button class="navbar-toggler pr-3" type="button" data-toggle="collapse" data-target="#target"
                    aria-controls="target" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="target">
                    <div class="pr-3 text-right ml-auto">
                        <button class="btn mr-3">회원가입</button>
                        <button class="btn">로그인</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    methods: {
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