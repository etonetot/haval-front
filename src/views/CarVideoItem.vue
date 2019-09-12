<template>
    <v-contaiter>
      <v-card>
            <v-card-title class="headline">{{ itemVideo.title }}</v-card-title>
            {{videoid}}
      </v-card>
    </v-contaiter>
</template>


<script>
    import config from '@/config.js'
    export default {
        data() {
            return {
            }
        },

        computed: {
            itemVideo() {
                return this.$store.getters.GET_VIDEO_ITEM;
            },
            videoid(){
                return this.$route.params.videoid;
            }
        },

        watch: {

        },

        methods: {
               
   },

        activated () {
            this.$store.dispatch('LOAD_VIDEO', this.$route.params.docid);
        },

        
    }
</script>
