<template>
    <div class="Authenticate">
        <div>
            <i class="mdi mdi-loading mdi-spin"></i>
            <strong>사용자 인증 중...</strong>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

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

        if (!this.token) this.$router.replace('/');


        this.loadProfile();
    },

    methods: {
        async loadProfile() {
            let res = await axios.post('/api/user/authenticate');

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