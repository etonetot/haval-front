import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    cars:[],
  },

  getters: {
    GET_CARS: state => {
      return state.cars;
    },
  },

  mutations: {
    CARS_LOADED : (state, payload) => {
      //console.log("CARS_LOADED", payload.length);
      state.cars = payload;
      state.cars.forEach(item => {
         let a = item.href.split('/');
         if (item.href[0]=='/')
            a.shift();
         if (config.removeExtraPathItem)
            a.shift();
         if (item.href[item.href.length-1]=='/')
            a.pop();
         item.hrefCar = a[a.length-1]; 
         item.href = a.join("/");
         
         //console.log(item.href);
      });

    },

  },

  actions: {
    LOAD_CARS ({ state, commit, rootState } ) {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + 'getcars')
      .then(response => {
        commit('END_LOADING');
        commit('CARS_LOADED', response.data);
        // if (rootState.curCar)
        // {
        //   let carData = state.cars.find( item => {
        //       return item.hrefCar==rootState.curCar 
        //   });
        //   this.commit('SET_CARDATA', carData);
        // }

      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + 'getcars');
        commit('ERROR_LOADING', error);
      });



      // let { data } = await axios.get(config.httpserver + config.vendor + 'getcars')
      // context.commit('SET_CARS', data);
      // console.log("STORE cars loaded "+ data.length);

      
    },

  },

};
