<template>
  <v-container class="p-3">

    <v-layout row wrap v-for="st in saleStatus" :key="st.id">
      <v-flex xs12>
        <h2 v-if="carsWithStatus(st.id, st.id2).length">{{st.title}}</h2>
      </v-flex>
      <v-flex shrink v-for="item in carsWithStatus(st.id, st.id2)" :key="item.id">

        <v-hover>
          <v-card  :class="`ma-4 carcard elevation-${hover ? 5 : 2}`" slot-scope="{ hover }">
            <router-link :to="'/' + item.href + '/photo'">
              <v-img :src="root + item.photodir + '/logo2.jpg'" width="240px"></v-img>
            </router-link>

            <v-card-title class="blue py-1">
                <router-link :to="'/' + item.href" class="white--text carTitle title">{{item.modelname}}</router-link>

                <v-spacer></v-spacer>

                <v-menu bottom offset-x>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on"> <v-icon>more_vert</v-icon> </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile v-for="(button, i) in buttons" :key="i" :to="'/' + item.href + button.href">
                      <v-list-tile-title >{{ button.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>


            </v-card-title>

            <priceRub rub :price="item.price1" class="text-xs-right"></priceRub>

          </v-card>
        </v-hover>

      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
    import config from '@/config.js'

    export default {
        name: 'Catalog',

        metaInfo: {
          title: 'Модели Haval',
        },

        components: {
            priceRub: () => import('@/components/priceRub'),
        },

        data () {
            return {

                buttons: [
                    { name: 'props',  href:'/props', title:'Технические характеристики'},
                    { name: 'photo',  href:'/photo', title:'Фотографии'},
                    { name: 'video',  href:'/video', title:'Видео'},
                    { name: 'doc',  href:'/doc', title:'Документация'},
                    { name: 'news',  href:'/news', title:'Новости'},
                    { name: 'sales',  href:'/sales', title:'Продажи'},
                ],

                saleStatus:[
                    {id: "rus", id2: "rusplan", title: ""},
                    {id: "", id2: "",           title: "Модели внутреннего рынка"},
                    {id: "old", title: "Снятые с производства"},
                    {id: "con", title: "Концепты"},
                ]

            }
        },

        computed: {
            cars() {
                return this.$store.getters.GET_CARS;
            },

            root() {
                return config.imageserver;
            }
        },

        methods: {
            load(){
                
                //this.$store.dispatch('LOAD_CARS');
            },

            carsWithStatus(status1, status2) {
                let cars = this.$store.getters.GET_CARS;
                return cars.filter( item => item.status==status1 || item.status==status2 )
            },

        },

        mounted: function()
        {
            this.load();
        },

    }
</script>

<style scoped>
  .carTitle {
    
    text-decoration: none;
  }

  .carcard {
    /*width: 240px;*/
  }

</style>
