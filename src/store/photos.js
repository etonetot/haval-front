import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    photos:[],
  },

  getters: {
    GET_PHOTOS: state => {
      return state.photos;
    },
    GET_CURFOLDERTITLE: state => curFolder => {
      return state.photos.length ? state.photos[curFolder].title  : '--';
    },
    


    


  },

  mutations: {
    SET_PHOTOS : (state, payload) => {
      //  console.log("SET_PHOTOS", payload.length);
      state.photos = payload;
    },

  },

  actions: {
    LOAD_PHOTOS : ( { state, commit, rootState } ) => {
      //console.log(config.httpserver + config.vendor + rootState.curCar + '/getphotos');
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getphotos')
      .then( ({data}) => {
        commit('END_LOADING');
        commit('SET_PHOTOS', data.photos);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getphotos');
        commit('ERROR_LOADING', error);
      });

    },

  },

};
