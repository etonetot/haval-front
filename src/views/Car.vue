<template>
    <div>

        <v-card class="subheading">
            <v-layout row wrap class=pb-3>
                <v-flex shrink>
                    <img class="ma-1 sm4 carlogo" :src="root + curCarData.photodir + '/logo2.jpg'" width="240px"></img>
                </v-flex>
                <v-flex class="pl-3 sm8">
                    <h1 class="title text-xs-center ma-2">{{curCarData.modelname}}</h1>
                    <div class="body-1" v-html="curCarData.review"></div>

                    <priceRub rub :price="curCarData.price1" title="Цена в России: от"></priceRub>
                    <priceRub :price="curCarData.chinaprice1" :priceTo="curCarData.chinaprice2" title="Цена в Китае: от"></priceRub>

                </v-flex>
            </v-layout>
        </v-card>    

        <!-- <v-divider class="my-3"></v-divider> -->

        <v-tabs show-arrows class="elevation-1" grow >
            <v-tab flat  v-for="item in carmenu" :key="item.name" :to="'/' + config.vendor + curCar + item.href" >
                {{item.title}}
            </v-tab>
        </v-tabs>


        <transition name="fadeCar" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
        </transition>


    </div>
</template>

<script>

    import config from '@/config.js'

    export default
    {
        components: {
            priceRub: () => import('@/components/priceRub'),
        },

        metaInfo () { 
            return  {
                    title: this.curCarData.modelname,
            }
        },

        data () {
            return {
                

                carmenu: [
                    { name: 'props',  href:'/props', title:'Технические характеристики'},
                    { name: 'photo',  href:'/photo', title:'Фотографии'},
                    { name: 'video',  href:'/video', title:'Видео'},
                    { name: 'doc',  href:'/doc', title:'Документация'},
                    { name: 'news',  href:'/news', title:'Новости'},
                    { name: 'sales',  href:'/sales', title:'Продажи'},
                ],
            }
        },

        computed: {
            config() {
                return config;
            },

            root() {
                return config.imageserver;
            },            
            curTab() {
                return this.$store.state.curTab;
            },
            curCar() {
                return this.$store.state.curCar;
            },
            curCarData(){
                return this.$store.state.curCarData;

            }
        },

        methods: {
            isTabActive: function (name) {
                return 0;
                return name == this.curTab;
            },

    
        },
        filters: {
        }

    }
</script>

<style  >
    .activeTabClass{
        background-color: aqua;
    }
    .carlogo {
        border-radius: 3px;
    }
    .fadeCar-enter-active, .fadeCar-leave-active {
        transition: opacity 0.3s;
    }
    .fadeCar-enter, .fadeCar-leave-to  {
        opacity: 0;
    }
</style>
