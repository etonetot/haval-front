<template>
  <v-app>
    <v-toolbar app class="text-lg-left">

      <v-snackbar v-model="snackbar" top :timeout="6000" color="error">
            {{ snackbarText }}
            <v-btn flat @click="snackbar = false">
              <v-icon>close</v-icon>
            </v-btn>
      </v-snackbar>



      <v-menu  transition="scale-transition" offset-y>
        <template v-slot:activator="{ on }">
            <v-toolbar-side-icon v-on="on"></v-toolbar-side-icon>
        </template>

        <v-list>
          <v-list-tile v-for="item in mainmenu" :key="item.title" :to="item.href" >
            <v-list-tile-title v-text="item.title" ></v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="hrefroot">
            <v-list-tile-title>Все модели</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>




      <v-btn flat :to="hrefroot" active-class="" class="logoBtn">
        <v-img :src="config.imagesDir+'logo.png'" :width="logoWidth"></v-img>
      </v-btn>

      <v-btn flat fixed-tabs v-for="item in mainmenu" :key="item.title" :to="item.href" class="hidden-sm-and-down">
        <v-img :src="config.imagesDir+'cars/'+item.title+'.gif'"></v-img>
        <span class="">&nbsp; {{item.title}}</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn flat href="/" class="logoBtn">
        <v-icon class=ma-2>fa-comments</v-icon> Форум
      </v-btn>

      <v-progress-circular indeterminate color="primary" v-show="loading"></v-progress-circular>
      
      
    </v-toolbar>

    <v-content>
      <v-container>

        <breadcrumps class="subheading"></breadcrumps>
      
        <router-view></router-view>

      </v-container>
    </v-content>
  </v-app>

</template>

<script>

import config from '@/config.js'

export default {
  name: 'App',
  components: {
            breadcrumps: () => import('@/components/breadcrumps'),
  },
  data () {
    return {

        mainmenu: [
            { href: '/'+config.vendor+'h2', title:'H2', /*modelid:375 */},
            { href: '/'+config.vendor+'h6', title:'H6', /*modelid:572 */},
            { href: '/'+config.vendor+'h9', title:'H9', /*modelid:522 */},
            { href: '/'+config.vendor+'f7', title:'F7',  },
        ],

        carmenu: [
            { name: 'props',  href:'/props', title:'Технические характеристики'},
            { name: 'photo',  href:'/photo', title:'Фотографии'},
            { name: 'video',  href:'/video', title:'Видео'},
            { name: 'doc',  href:'/doc', title:'Документация'},
            { name: 'news',  href:'/news', title:'Новости'},
            { name: 'sales',  href:'/sales', title:'Продажи'},
        ],

        hrefroot: '/'+config.vendor,



    }
  },

  computed: {

        config() {
            return config;
        },

        curTab() {
            return this.$store.state.curTab;
        },
        loading() {
            return this.$store.state.loading;
        },

        snackbar:{
          get: function () { 
            return this.$store.state.neterror;   
            console.dir(this.$store.state);
          },
          set: function(newValue) { 
            this.$store.commit('ERROR_SHOWED');   
          },
        },
        snackbarText(){
          return this.$store.state.errorText; 
        },
        logoWidth(){
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return '140px'
              case 'sm': return '200px'
              default: return '240px'
            }          
        }

  },


  watch: {
        '$route' (to, from) {
            //console.log("----------app route watch");
            //console.log(to);
            this.$store.commit('changeCar', to.params.car);
            this.$store.commit('changeTab', to.name);
        }
  },

  methods: {
        isActive(href)
        {
            return href==this.$route.params.car ? 'active' :''
        },

    },

    mounted() {
        this.$store.dispatch('LOAD_CARS');
        this.$store.dispatch('LOAD_RATE');
        this.$store.commit('changeCar', this.$route.params.car);
        this.$store.commit('changeTab', this.$route.name);
    },






}
</script>

<style>
@import "https://use.fontawesome.com/releases/v5.1.0/css/all.css";

.logoBtn:hover {
  /* background-color:  !important; */
  
}

</style>
