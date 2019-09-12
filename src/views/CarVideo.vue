<template>

    <div class="my-3 pageVideo">
        <v-card>
            <v-expansion-panel :popout="true" v-model="panel">
                <v-expansion-panel-content v-for="(item, ind) in video" :key="item.id" >
                <template v-slot:header>
                    <v-layout>
                        <v-flex :shrink="true">
                            <v-img :src="mapThumb[ind]" height="100px" width="200px" contain></v-img>
                        </v-flex>
                        <v-flex class="subheading videopanel">                        
                            {{item.title}}
                        </v-flex>
                    </v-layout>
                </template>
                <v-card>
                    <v-card-text class="ml-4">
                        <iframe v-if="panel===ind" width="640" height="360" :src="'https://www.youtube.com/embed/'+item.link" 
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-card-text>
                </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>  
    </div>

</template>

<script>

    import config from '@/config.js'
    import axios from 'axios';

    export default {

        metaInfo () { 
            return  {
                    title: this.$store.state.curCarData.modelname + " - Видеоролики",
            }
        },

        data() {
            return {
                name:"carvideo",
                needReload: 1,
                mapThumb: 0,
                panel: [],
            }
        },

        computed: {
            config() {
                return config;
            },

            video(){
                return this.$store.getters.GET_VIDEO;
            },

            curCar() {
                return this.$store.getters.curCar;
            },

        },

        asyncComputed:{
            thumb (ind) {
                return ind;
                }
        },

        watch: {
            curCar(newCar)
            {
                this._inactive ? this.needReload = 1 : this.load();
            },

            video(newVideo)
            {
                for (let i=0 ; i<newVideo.length ; i++)
                {
                    this.mapThumb.splice(i, 1, config.imagesDir + "mqdefault.jpg");

                    axios
                        .get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+newVideo[i].link+"&key=AIzaSyD3dMFKCrpKTcy4dH9oRckTfVUiATm19Sk")
                        .then(request => {
                            this.mapThumb.splice(i, 1, request.data.items[0].snippet.thumbnails.high.url);
                        });

                };
            }

        },

        methods: {

            load(){
                this.needReload = 0;
                this.mapThumb = [];
                //console.log(this.name, "load start "+this.curCar);
                this.$store.dispatch('LOAD_VIDEO');
            },

            getThumb(id) {
                return this.mapThumb.get(id);
                /*
                let {data} = await axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=JKyllBtlvr0&key=AIzaSyD3dMFKCrpKTcy4dH9oRckTfVUiATm19Sk");
                alert(data.items[0].snippet.thumbnails.medium.url);
                return data.items[0].snippet.thumbnails.medium.url;
                */
            },

        },

        activated: function()
        {
            if (this.needReload && this.curCar)
                this.load();
        },


    }
</script>


<style scoped>
    /*@import './src/css/common.scss';*/
    .pageVideo{
        max-width: 800px;
    }

    .videopanel
    {
        align-self: center;
    }

</style>





