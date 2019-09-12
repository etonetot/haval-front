<template>
    <div>
        
        <div class="text-xs-center mb-3" v-if="items.length > newsCountOnPage">
            <v-pagination circle v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
        </div>

            <v-container >

                <v-layout row wrap >

         <!-- <v-slide-y-transition group hide-on-leave>  -->

                    <v-flex  xs12 md6 v-for="item in newsOnPage" :key="item.id">

                        <v-hover>        
                            <v-card :class="`ma-3 elevation-${hover ? 5 : 2}`" slot-scope="{ hover }">
                                <router-link :to="'/newsitem/' + item.id" class="white--text newsLnk">
                                    <v-img class="newsImage" :src="getNewsImage(item, 0)" height="300px">
                                        <v-container class="newsContainer pa-1  ">
                                            <v-layout row wrap >
                                                <v-flex class="white--text mt-1 mr-2 text-xs-right offset-xs9 xs3 ">{{ item.posted | dateFormat}}</v-flex>
                                                <v-flex class="headline newsSubject  ma-2 mt-5">{{item.subject}}</v-flex>
                                                <v-flex class="white--text newsSubject ma-2 ml-5">{{item.review}}</v-flex>
                                            </v-layout>
                                
                                        </v-container>

                                    </v-img>
                                </router-link>
                            </v-card>

                        </v-hover>    
                    </v-flex>




        <!-- </v-slide-y-transition> -->

                </v-layout>

            </v-container> 



    </div>
</template>

<script>
    import config from '@/config.js'
    // import moment from 'moment'

    export default {
        props:['items', ],
        data() {
            return {
                newsCountOnPage: 6,
                page: 1,
            }
        },

        computed: {
            newsOnPage(){
                let start = (this.page-1) * this.newsCountOnPage;
                let end = start + this.newsCountOnPage;
                return this.items.slice(start, end);    
            },
            pageCount(){
                return Math.ceil(this.items.length / this.newsCountOnPage);
            },
        },

        watch: {
            page(newPage)
            {
                this.$emit('pageChanged', newPage);
            }

        },

        methods: {
            getNewsImage(item, numImage){
                let postfix = numImage > 1 ? numImage.toString() : '';
                return config.imageserver + config.newsimagesDir + item['news_image' + postfix];
            },

                        
        },

        // filters: {
        //    dateFormat: function (value) {
        //         if (!value) return '';
        //         return moment(String(value)).format('DD.MM.YYYY');
        //    },
        // },


        activated: function()
        {
        },
    
    }
</script>

<style>

    .newsContainer{
       background-color:rgba(0,0,0,.5);
       height: 100%;
    }

    .newsLnk {
        text-decoration: none;
    }

    .newsSubject{
       background-color:rgba(0,0,0,.2);
       border-radius: 6px;
       padding:5px;
       transition: 0.7s all;
    }

    .newsSubject:hover{
        background-color:rgba(0,0,0,.4);
    }


  
    

</style>
