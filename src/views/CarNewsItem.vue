<template>
    <div class="my-3">
      <v-card class="newsText">
          
            <!-- <v-card-title class="headline">{{ newsitem.subject }}</v-card-title> -->

            <v-img class="newsImage" :src="getNewsImage(newsitem, 0)"  :contain="true">
                <v-container class="newsContainer pa-1">
                    <v-layout row wrap >
                        <v-flex class="white--text mt-1 mr-2 offset-xs9 xs3 text-xs-right">{{ newsitem.posted | dateFormat}}</v-flex>
                        <v-flex class="headline white--text newsSubject ma-2 mt-2">{{newsitem.subject}}</v-flex>
                    </v-layout>
        
                </v-container>

            </v-img>

            <p class="subheading pa-3" v-html="newsitem.content"></p>

            <v-img class="newsImage" v-if="newsitem['news_image2']" :src="getNewsImage(newsitem, 2)" :contain="true"></v-img>
            <v-img class="newsImage" v-if="newsitem['news_image3']" :src="getNewsImage(newsitem, 3)" :contain="true"></v-img>
            <v-img class="newsImage" v-if="newsitem['news_image4']" :src="getNewsImage(newsitem, 4)" :contain="true"></v-img>
            <v-img class="newsImage" v-if="newsitem['news_image5']" :src="getNewsImage(newsitem, 5)" :contain="true"></v-img>


      </v-card>
    </div>
</template>


<script>
    import config from '@/config.js'
    export default {

        metaInfo () { 
            return  {
                    title: this.newsitem.subject,
            }
        },

        data() {
            return {
            }
        },

        computed: {
            newsitem() {
                return this.$store.getters.GET_NEWSITEM;
            },
            newsid(){
                return this.$route.params.newsid;
            }
        },

        watch: {

        },

        methods: {
            getIcon(content){

            },    
            getNewsImage(item, numImage){
                let postfix = numImage > 1 ? numImage.toString() : '';
                return config.imageserver + config.newsimagesDir + item['news_image' + postfix];
            },


        },

        created: function() {
            console.log("newsitem.created");
            this.$store.dispatch('LOAD_NEWSITEM', this.$route.params.newsid);
        },
        
    }
</script>

<style scoped>

   .newsSubject{
       background-color:rgba(0,0,0,.2);
       border-radius: 6px;
       padding:5px;
       transition: 0.7s all;
    }

   .newsText{
        max-width: 744px;
   }

    .newsImage{
        margin: 15px 0px;
        /* max-width: 744px; */
    }

    .newsSubject:hover{
        background-color:rgba(0,0,0,.4);
    }


</style>

