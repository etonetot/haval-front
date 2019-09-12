import Vue from 'vue'
import Router from 'vue-router'
import Catalog from './views/Catalog.vue'
import Car from '@/views/Car'

import CarPhoto from '@/views/CarPhoto'
import AllNews from '@/views/AllNews'
import CarNews from '@/views/CarNews'
import CarNewsItem from '@/views/CarNewsItem'
import CarSales from '@/views/CarSales'
import CarProps from '@/views/CarProps'
import CarVideo from '@/views/CarVideo'
import CarDocs from '@/views/CarDocs'
import CarDocItem from '@/views/CarDocItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes: [
  {
    path: '/haval',
    component: Catalog,
    meta: {
        breadcrumb: 'Модели Haval',
    },
  },  
  {
          path: '/haval/:car/',
          //name: 'car',
          component: Car,
          meta: {
            breadcrumb: function () {
              return this.$store.state.curCarData ? this.$store.state.curCarData.modelname : "-";  
            },
            parent: "/haval",
          },
          children:           
          [
              {
                        path: '/haval/:car/photo',
                        component: CarPhoto,
                        meta: {
                          breadcrumb: 'Фотографии',
                        },
                        children: [
                            {
                                path: ':folder',
                                meta: {
                                  breadcrumb: function () {
                                    return this.$store.getters.GET_CURFOLDERTITLE(this.$route.params.folder) ;  
                                  },
                                },
                            },
                        ]
              },
              {
                        path: 'props',
                        component: CarProps,
                        meta: {
                          breadcrumb: 'Характеристики и цены',
                        },
              },
              {
                        path: 'video',
                        component: CarVideo,
                        meta: {
                          breadcrumb: 'Bидео',
                        },
              },
              {
                        path: 'sales',
                        component: CarSales,
                        meta: {
                          breadcrumb: 'Продажи в Китае',
                        },
              },
              {
                        path: 'doc',
                        component: CarDocs,
                        meta: {
                          breadcrumb: 'Документация',
                        },
              },
              {
                        path: 'doc/:docid',
                        component: CarDocItem,
                        meta: {
                          breadcrumb: function () {
                            return this.$store.state.docs.curDoc ? this.$store.state.docs.curDoc.docname : "-";  
                          },
                          parent:"/haval/:car/doc"
                        },
              },
              {
                        name: "carnews",
                        path: 'news/:page?',
                        component: CarNews,
                        meta: {
                          breadcrumb: 'Новости',
                        },
              },

      
          ]
  },
   

  {
    name: "carnewsitem",
    path: '/newsitem/:newsid',
    component: CarNewsItem,
    meta: {
      breadcrumb: function () {
        return this.$store.state.news.curNews ? this.$store.state.news.curNews.subject : "-";  
      },
      parent:"/news"
    },
  },

  {
    name: "allnews",
    path: '/news/:page?',
    component: AllNews,
    meta: {
      breadcrumb: "Новости",
      parent: "/haval",
    },
  },



  {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
  ]
})


