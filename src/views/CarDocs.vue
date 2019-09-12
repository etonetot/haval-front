<template>
    <div class="my-3">
        <v-card>
            <v-layout row wrap>
                    <v-flex xs12 md5> 
                        <v-card-text> 
                            <v-treeview ref="treeview" :items="chapters" v-model="treeSelected" selectable open-on-click :open="opened">
                            </v-treeview>
                        </v-card-text>               
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex xs12 md6>  
                        <v-card-text>
                            <v-list >
                                <v-scroll-x-transition group hide-on-leave>
                                    <v-list-tile
                                            v-for="item, ind in docsVisible" :key="item.id"
                                            :class="{odd : ind%2==0}"
                                            :to="item.id.toString()" append >
                                        <v-list-tile-avatar>
                                            <v-icon>{{getIcon(item.content)}}</v-icon>
                                        </v-list-tile-avatar>

                                        <v-list-tile-content>
                                            <v-list-tile-sub-title class="subheading">{{ item.docname }}</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-scroll-x-transition>
                            </v-list >
                        </v-card-text>
                </v-flex>
            </v-layout>
       </v-card>
    </div>
</template>

<script>
    import config from '@/config.js'
    export default {
        
        metaInfo () { 
            return  {
                    title: this.$store.state.curCarData.modelname + " - Документация",
            }
        },

        data() {
            return {
                name:"cardocs",
                needReload: 1,
                arrChecked: true,
                treeSelected: [],
                opened: []
            }
        },

        computed: {
            curCar() {
                //console.log("doc computed curcar "+this.$store.state.curCar);
                return this.$store.getters.curCar;
            },
            chapters(){
                //console.log("doc computed chapters "+this.$store.getters.GET_CHAPTERS.length);
                return this.$store.getters.GET_CHAPTERS;
            },
            docs(){
                //console.log("doc computed docs "+this.$store.getters.GET_DOCS.length);
                return this.$store.getters.GET_DOCS;
            },
            docsVisible(){
                return this.docs.filter(item=>{
                    return this.treeSelected.includes(item.chapter1) ||
                           this.treeSelected.includes(item.chapter2) || 
                           this.treeSelected.includes(item.chapter3);
                })
            },
        },

        watch: {
            curCar(newCar, oldQuestion)
            {
                if (this._inactive)
                    this.needReload = 1;
                else
                    this.load();
            },

            chapters()
            {
                this.treeSelected = [];
                this.chapters.forEach(item => this.treeSelected.push(item.id) );

                this.$nextTick(function(){
                    this.$refs.treeview.updateAll(true);
                });
                
            }

        },

        

        methods: {
            load(){
                //console.log("docs load");
                this.arrChecked = true,
                    this.needReload = 0;
                this.$store.dispatch('LOAD_DOCS');
            },
            getIcon(content){
                return "fa-file";
            },    
            openAll(){
                this.$refs.treeview.updateAll(true);
            }

        },

        activated: function()
        {
            if (this.needReload && this.curCar)
                this.load();
        },
    
    }
</script>

<style>

    .odd{
       background-color: #eee; 
    }
    



</style>
