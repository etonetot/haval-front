import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    video:[],
  },

  getters: {
    GET_VIDEO: state => {
      return state.video;
    },
  },

  mutations: {
    SET_VIDEO : (state, payload) => {
      state.video = payload;
    },

  },

  actions: {
    LOAD_VIDEO : ( { state, commit, rootState } ) => {
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getvideo')
      .then( ({data}) => {
        commit('END_LOADING');
        commit('SET_VIDEO', data);
        //console.log("STORE video loaded "+context.rootState.curCar+' ' + data.length);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getvideo');
        commit('ERROR_LOADING', error);
      });

    },

  },

};
