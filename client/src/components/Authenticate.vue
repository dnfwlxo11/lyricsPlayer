<template>
    <div class="authenticate h-100">
        <div class="h-100 d-flex justify-content-center align-items-center">
            <i class="mdi mdi-loading mdi-spin"></i>
            <strong>사용자 인증 중...</strong>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Authenticate',
    data() {
        return {
            token: null,
            redirect: null,
        }
    },

    mounted() {
        this.redirect = this.$route.query.redirect || '/';
        this.token = this.$cookies.get('x_auth');

        this.loadProfile();
    },

    methods: {
        async loadProfile() {
            let res = await this.$Api.post('/api/user/authenticate');

            if (res.data.success) {
                this.$store.commit('setUserProfile', res.data.result);
                this.$router.replace(this.redirect);
            } else {
                this.$router.replace('/');
            }
        }
    }
}
</script>