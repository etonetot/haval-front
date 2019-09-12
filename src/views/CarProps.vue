<template>
    <div class="my-3">
        <scroll-table class="proptable elevation-2" :cols="columns" :rows="rows"></scroll-table>
    </div>
</template>



<script>
    import config from '@/config.js'

    export default {
        components: {
            ScrollTable: () => import('@/components/propstable'),
        },

        metaInfo () { 
            return  {
                    title: this.$store.state.curCarData.modelname + " - Характеристики и цены в Китае",
            }
        },

        data() {
            return {
                needReload: 1,
            }
        },

        computed: {
            curCar() {
                // console.log("props computed curcar " + this.$store.state.curCar);
                return this.$store.getters.curCar;
            },
            columns(){
                return this.$store.getters.GET_PROP_COLS;
            },
            rows(){
                return this.$store.getters.GET_PROP_ROWS;
            },

        },

        watch: {
            curCar(newCar)
            {
                // console.log("props watch " + newCar);
                if (!this._inactive)
                    this.load();
                else {
                    this.needReload = 1;
                    // console.log("props needReload");
                }
            },
            

        },

        methods: {
            load(){
                //console.log("props load");
                this.needReload = 0;
                this.$store.dispatch('LOAD_PROPS');
                
            },

        },

        activated: function()
        {
            if (this.needReload && this.curCar)
                this.load();
            // console.log('Props activated this.needReload=', this.needReload)
        },

    }
</script>


<style >


</style>
