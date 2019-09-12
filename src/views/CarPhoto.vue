<template>

    <div class="my-3 pagePhoto">

        <v-layout row nowrap class="">    
            <v-flex> 
                <v-menu offset-y transition="slide-y-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">
                            {{curFolderTitle}}
                            <v-icon right>fa-caret-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile v-for="item in folderlist" :key="item.folder" :to="curFolderLink(item.folder)">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list> 
                </v-menu>
            </v-flex>    
                

            <v-flex class="text-xs-right align-self-end" >
                     {{slide+1}}/{{arrCurFolderFiles.length+1}} 
            </v-flex>

        </v-layout>
            <v-carousel
                    id="carousel1"
                    :cycle="false"
                    v-model="slide"
                    
                    class="car-carousel"
                    delimiter-icon="stop"
            >

                <v-carousel-item v-for="(item,ind) in arrCurFolderFiles" :key="ind" :src="folderPath+item" >
                </v-carousel-item>

                <v-carousel-item class="last-slide" :src="folderPath+arrCurFolderFiles[0]" :key="arrCurFolderFiles.length+1">
                    <div class="pa-3">    
                        <p v-for="folder in folderlist" :key="folder.folder">
                            <router-link  :to="curFolderLink(folder.folder)">{{folder.title}}</router-link>
                        </p>
                    </div>
                </v-carousel-item>  

            </v-carousel>


    </div>


</template>

<script>

    import config from '@/config.js'

    export default {

        metaInfo () { 
            return  {
                    title: this.$store.state.curCarData.modelname + " - Фотогалерея",
            }
        },

        data() {
            return {
                slide: 0,
                //curFolder: 0,
                needReload: 1,
            }
        },

        computed: {

            photos(){
                // console.log(this.name, "computed photos");
                return this.$store.getters.GET_PHOTOS;
            },

            arrCurFolderFiles(){
                return this.curFolder<this.photos.length ? this.photos[this.curFolder].files : [];
            },

            curFolder(){
                return this.$route.params.folder ? this.$route.params.folder : 0 ;
            },

            curCar() {
                // console.log(this.name, "computed curcar ", this.$store.state.curCar);
                return this.$store.getters.curCar;
            },

            folderPath: function () {
                return this.photos.length ? config.imageserver + this.photos[this.curFolder].path : "";
            },

            folderlist: function() {
                let arr = [];
                for (let i=0 ; i<this.photos.length ; i++)
                    if (i!=this.curFolder)
                        arr.push({folder: this.photos[i].folder, title: this.photos[i].title})
                return arr;
            },

            curFolderTitle: function(){
                return this.$store.getters.GET_CURFOLDERTITLE(this.curFolder);
            },
        },

        watch: {
            curCar(newCar)
            {
                if (!this._inactive)
                    this.load();
                else {
                    this.needReload = 1;
                }
                // console.log(this.name, "watch curCar, needReload=", this.needReload );
            },

            '$route' (to, from) {
                // console.log(this.name + " route watch");
                if (to.params.folder!=this.curFolder)
                {
                    // console.log(this.name + " route watch change folder");
                    this.slide = 0;
                }
            },    


        },

        methods: {
            curFolderLink(folder) {
                return '/' + config.vendor + this.curCar + '/photo/' + (folder ? folder : '');
            },

            load(){
                this.needReload = 0;
                // console.log(this.name, "load start "+this.curCar);
                this.$store.dispatch('LOAD_PHOTOS');
            },

            getBreadCrumbName: function(){
                return this.photos.length ? this.photos[this.curFolder].title + ' ' : '';
            },


        },

        activated: function() {
            //console.log(this.name, ' activated ', this.slide );
            if (this.needReload && this.curCar)
                this.load();
        },
        created: function(){
            this.slide=0;
        }


    }
</script>


<style >
    /*@import './src/css/common.scss';*/
    .pagePhoto{
        max-width: 800px;
    }

    .car-carousel .carousel-caption
    {
        text-align:left;
        top: 20px;
        left: 10%;
        font-size: 1.5rem !important;
    }

    .car-carousel .carousel-caption a
    {
        color: $link_color;
        text-shadow: 0 0 0;
    }


    .car-carousel .last-slide div.v-image__image
    {
        opacity: 0.25;
    }
    .car-carousel .last-slide a
    {
        opacity: 0.99;
        font-size: 2em;
        color: black;

    }

    .car-carousel .carousel-control-prev-icon, .car-carousel .carousel-control-next-icon
    {
        width: 40px;
        height: 40px;
    }


    .car-carousel .carousel-control-next
    {
        padding-left:100px;
        transition: padding 0.2s ease;
    }

    .car-carousel .carousel-control-next:hover
    {
        padding-left:0px;
    }

    .car-carousel .carousel-control-prev
    {
        padding-right:100px;
        transition: padding 0.2s ease;
    }

    .car-carousel .carousel-control-prev:hover
    {
        padding-right:0px;
    }



    /*
      .changeCar-enter-active, .changeCar-leave-active {
        transition: opacity 1.4s;
      }
      .changeCar-enter, .changeCar-leave-to {
        opacity: 0;
      }
    */
</style>





