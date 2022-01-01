<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    #app {
        font-family: 'Noto Sans KR', sans-serif;
        // font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #3C3D59;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .btn {
        color: white;
        background-color: #6872A6;
        border: none;
    }

    .btn:hover {
        color: white;
        background-color: #F2D4C9;
        border: none;
        color: #3C3D59;
    }

    input {
        background-color: #F2F2F2;
        color: #A599B0;
        border: none;
        outline: none;
        width: 40%;
        height: 40%;
        border-radius: 0.5rem;
    }

    .album:hover {
        -webkit-transform: scale(1.2);
        transform: scale(1.1);
        -webkit-transition: .3s;
        transition: .3s;
    }
</style>
