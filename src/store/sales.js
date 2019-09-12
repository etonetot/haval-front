import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    sales: [],
  },

  getters: {
    GET_SALES_RUS: state => {
      return state.sales.rus;
    },
    GET_SALES_CHINA: state => {
        return state.sales.china;
      },
    },

  mutations: {
    SET_SALES : (state, sales) => {
      //console.log("SET_SALES", sales.length);
      state.sales = sales;
    },

  },

  actions: {
    LOAD_SALES : ({ state, commit, rootState }) => {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getsales')
      .then( ({data}) => {
        commit('END_LOADING');
        commit('SET_SALES', data);
        //console.log("STORE DOC loaded "+rootState.curCar+' ' + data.rows.length + ' ' + root.children.length);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getnews');
        commit('ERROR_LOADING', error);
      });

    },



  },

};
