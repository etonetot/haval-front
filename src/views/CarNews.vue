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
                    title: this.$store.state.curCarData.modelname + " - Новости",
            }
        },

        data() {
            return {
                needReload: 1,
                name: "CarNews",
            }
        },

        computed: {
            curCar() {
                //console.log("doc computed curcar "+this.$store.state.curCar);
                return this.$store.getters.curCar;
            },
            newsList(){
                //console.log("doc computed docs "+this.$store.getters.GET_DOCS.length);
                return this.$store.getters.GET_NEWS;
            },
            
        },

        watch: {
            curCar(newCar, oldQuestion)
            {
                this._inactive ? this.needReload = 1 : this.load();
            },

        },

        methods: {
            load(){
                //console.log("news load");
                this.needReload = 0;
                this.$store.dispatch('LOAD_NEWS');
            },
            pageChanged(page)
            {
                this.$router.push({ name: 'carnews', params: page==1 ? undefined : { page: page } })
            }

        },

        activated: function()
        {
            //console.log(this.name + "activated + needreload=" + this.needReload)
            if (this.needReload && this.curCar)
                this.load();
        },
    
    }
</script>

<style>

</style>
