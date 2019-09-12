import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    news: [],
    allnews: [],
    curNews: 0,
  },

  getters: {
    GET_NEWS: state => {
      return state.news;
    },
    GET_ALLNEWS: state => {
      return state.allnews;
    },
    GET_NEWSITEM: state => {
      return state.curNews;
    },
  },

  mutations: {
    SET_NEWS : (state, news) => {
      //console.log("SET_DOCS", docs.length, chapters.length);
      state.news = news;
    },

    SET_ALLNEWS : (state, news) => {
      //console.log("SET_DOCS", docs.length, chapters.length);
      state.allnews = news;
    },

    SET_NEWSITEM : (state, news) => {
      news.content = news.content.replace(/\n/g, "<br />");
      news.content = news.content.replace(/http:\/\/chinamobil.ru\/great-wall/g, "");
      state.curNews = news;
    },

  },

  actions: {
    LOAD_NEWS : ({ state, commit, rootState }) => {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getnews')
      .then( ({data}) => {
        commit('END_LOADING');
        commit('SET_NEWS', data);
        //console.log("STORE DOC loaded "+rootState.curCar+' ' + data.rows.length + ' ' + root.children.length);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getnews');
        commit('ERROR_LOADING', error);
      });

    },

    LOAD_ALLNEWS : ({ state, commit, rootState }) => {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + 'getnews')
      .then( ({data}) => {
        commit('END_LOADING');
        commit('SET_ALLNEWS', data);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + 'getnews');
        commit('ERROR_LOADING', error);
      });

    },


    LOAD_NEWSITEM ({commit}, payload) {
      commit('START_LOADING');
      axios.get(`${config.httpserver}getnewsitem/?newsid=${payload}`)
      .then(response => {
        commit('END_LOADING');
        console.log("newsitem.activated 2");

        commit('SET_NEWSITEM', response.data);
      })
      .catch(error => {
        console.log("ERROR", error, `${config.httpserver}getdoc/?docid=${payload}`);
        commit('ERROR_LOADING', error);
      });
    },
  


  },

};
