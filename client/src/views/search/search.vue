<template>
    <div class="search">
        <top></top>
        <div class="container pt-5">
            <div class="text-left mb-5">
                <h3><strong>Search results for "{{keyword}}"</strong></h3>
            </div>
            <div v-if="this.options.title" class="text-left mb-3">
                <h5><strong>Title</strong></h5>
                <small>Found {{titles}} tracks.</small>
            </div>
            <div v-if="this.options.lyrics" class="text-left mb-3">
                <h5><strong>Lyrics</strong></h5>
                <small>Found {{lyrics}} tracks.</small>
            </div>
            <div v-if="this.options.album" class="text-left mb-3">
                <h5><strong>Album</strong></h5>
                <small>Found {{albums}} tracks.</small>
            </div>
            <div v-if="this.options.musician" class="text-left mb-3">
                <h5><strong>Musician</strong></h5>
                <small>Found {{musicians}} tracks.</small>
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
            keyword: 'Everything',
            titles: 0,
            lyrics: 0,
            albums: 0,
            musicians: 0,
            options: {},
            titleDummy: [],
            lyricsDummy: [],
            albumDummy: [],
            msucianDummy: [],
        }
    },
    mounted() {
        if (this.$route.query['keyword'] != undefined) this.keyword = this.$route.query['keyword']
        this.options = this.$route.query
        console.log(this.options)
    }
}
</script>

<style>

</style>