import Vue from 'vue'
import './plugins/vuetify'
import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store/store'


import VueCharts from 'vue-charts'
Vue.use(VueCharts);

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton);

import Meta from 'vue-meta';
Vue.use(Meta);


import VueYandexMetrika from 'vue-yandex-metrika' 
Vue.use(VueYandexMetrika, {
   id: 54208009,
   scriptSrc: "https://mc.yandex.ru/metrika/tag.js",
   router: router,
   env: process.env.NODE_ENV,
 //debug:true
   
});


Vue.config.productionTip = false;



Vue.filter('dateFormat', function (value) { 
  if (!value) return '';
  return moment(String(value)).format('DD.MM.YYYY');
});


Vue.filter('currency', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.');
});

Vue.filter('volume', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
