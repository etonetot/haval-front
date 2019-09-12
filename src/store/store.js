import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

import config from '@/config.js';
import modulePhotos from './photos.js';
import moduleDocs from './doc.js';
import moduleProps from './props.js';
import moduleCars from './cars.js';
import moduleVideo from './video.js';
import moduleNews from './news.js';
import moduleSales from './sales.js';


Vue.use(Vuex);





export default new Vuex.Store({

  modules: {
    photos: modulePhotos,
    docs: moduleDocs,
    video: moduleVideo,
    props: moduleProps,
    cars: moduleCars,
    news: moduleNews,
    sales: moduleSales,
  },

  state: {
    curTab: "",
    curCar: "",
    curCarData: {},
    rate: {},
    
    loading: false,
    neterror: false,
    errorText:'',
  },

  getters: {
    curTab: state => {
      return state.curTab;
    },
    curCar: state => {
      return state.curCar;
    },
    curCarData: state => {
      return state.curCarData;
    },
    rate: state => {
      return state.rate;
    },
   

  },

  mutations: {
    changeTab: function(state, newTab) {
        state.curTab = newTab;
    },
    changeCar: function(state, newCar) {
      if (state.curCar == newCar) {
        //console.log("state.curCar == newCar");
        return;
      }
      //console.log("changeCar");
      state.curCar = newCar;
      
      if (state.cars.cars.length && newCar)
      {
        let carData = state.cars.cars.find( item => {
            return item.hrefCar==state.curCar 
        });
        this.commit('SET_CARDATA', carData);
      }
      
      this.commit('SET_PHOTOS', []);
      this.commit('SET_VIDEO', []);
      this.commit('SET_SALES', []);
      this.commit('SET_DOCS', {docs:[], chapters:[]});
      this.commit('SET_PROPS', {rows:[], cols:[]});
      if (state.curCar)
        this.dispatch('LOAD_CARDATA');
    },

    SET_CARDATA: function(state, carData) {
      carData.review = carData.review ? carData.review.replace(/\/great-wall/g, "") : "";

      state.curCarData = carData;
      if ( state.curCarData==undefined )
        this.commit('ERROR_INTERNAL', "car not found");
    },

    SET_RATE: function(state, rate) {
      state.rate = rate;
    },


    START_LOADING: (state) => {
      state.loading = true;
    },

    ERROR_LOADING: (state, error) => {
      state.loading = false;
      state.neterror = true;
      state.errorText = error;
    },

    END_LOADING: (state) => {
      state.loading = false;
    },

    ERROR_INTERNAL: (state, error) => {
      state.neterror = true;
      state.errorText = error;
    },

    ERROR_SHOWED: (state) =>{
      state.neterror = false;
    },


  },

  actions:{
    LOAD_CARDATA ({ state, commit, rootState }) {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getcardata')
      .then(response => {
        commit('END_LOADING');
        commit('SET_CARDATA', response.data);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getcardata');
        commit('ERROR_LOADING', error);
      });
    },

    LOAD_RATE ({ state, commit, rootState }) {
      axios.get(config.httpserver + 'getrate')
      .then(response => {
        commit('SET_RATE', response.data);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + 'getrate');
      });
    },



  },

});
