<template>
    <div class="search">
        <top></top>
        <div class="container pt-5">
            <div>
                Musician 결과
            </div>
            <div>
                Music 결과
            </div>
            <div>
                Lyrics 결과
            </div>
        </div>
    </div>
</template>

<script>
import top from '@/components/Nav.vue'

export default {
    name: 'Search',
    components: {
        top,
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.$route.query)
    }
}
</script>

<style>

</style>