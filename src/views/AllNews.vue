<template>
    <div class="my-3">
        <NewsList :items="newsList" @pageChanged="pageChanged"></NewsList>
    </div>
</template>

<script>
    import config from '@/config.js'
    
    export default {
        components: {
            NewsList: () => import('@/components/newslist'),
        },

        metaInfo () { 
            return  {
                    title: "Новости о Haval",
            }
        },

        data() {
            return {
            }
        },

        computed: {
            newsList(){
                return this.$store.getters.GET_ALLNEWS;
            },
            
        },

        methods: {
            load() {
                console.log("allnews load");
                this.$store.dispatch('LOAD_ALLNEWS');
            },
            pageChanged(page) {
                this.$router.push({ name: 'allnews', params: page==1 ? undefined : { page: page } })
            }

        },

        created: function() {
            this.load();
        },
    
    }
</script>

<style>
</style>
