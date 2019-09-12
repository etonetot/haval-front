import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    rows: [],
    cols: [],
  },

  getters: {
    GET_PROP_ROWS: state => {
      return state.rows;
    },
    GET_PROP_COLS: state => {
      return state.cols;
    },
  },

  mutations: {
    SET_PROPS : (state, {rows, cols}) => {
      //console.log("SET_PROPS", rows.length, cols.length);
      state.rows = rows;
      state.cols = cols;
    },

  },

  actions: {
    LOAD_PROPS : ( { state, commit, rootState } ) => {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getprops')
      .then(response => {
        commit('END_LOADING');

        let cols = [{
          key: 'text',
          width: 250,
          fixed: 'left',
          type: 'html',
        }];

        for (let i=0 ; i<response.data.varcount && i<20; i++)
              cols.push({
                  key: 'text'+i,
                  width: 150,
                  type: 'html'
              });


        commit('SET_PROPS', {rows: response.data.rows, cols: cols});
        //console.log("STORE PROPS loaded "+context.rootState.curCar+' ' + data.rows.length + ' ' + cols.length);
      })
      .catch(error => {
         console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getprops');
         commit('ERROR_LOADING', error);
      });

    },

  },

};
