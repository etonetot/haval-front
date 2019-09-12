<template>
    <div class="my-3">
      <v-card>
            <v-card-title class="headline">{{ doc.docname }}</v-card-title>
            <p class="subheading pa-3" v-html="doc.content"></p>
      </v-card>
    </div>
</template>


<script>
    import config from '@/config.js'
    export default {
        
        metaInfo () { 
            return  {
                    title: this.doc.docname,
            }
        },

        data() {
            return {
            }
        },

        computed: {
            doc() {
                return this.$store.getters.GET_DOC;
            },
            docid(){
                return this.$route.params.docid;
            }
        },

        watch: {

        },

        methods: {
            getIcon(content){
                if (content.indexOf("pdf")!=-1)
                    return "fa-file-pdf";
                else if (content.indexOf("doc")!=-1)
                    return "fa-file-word";
                else    
                return "fa-file";

            },    
   },

        activated () {
            this.$store.dispatch('LOAD_DOC', this.$route.params.docid);
        },

        
    }
</script>
