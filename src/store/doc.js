import axios from 'axios';
import config from '@/config.js';


export default {

  state: {
    chapters: [],
    docs: [],
    curDoc: 0,
  },

  getters: {
    GET_DOCS: state => {
      return state.docs;
    },
    GET_CHAPTERS: state => {
      return state.chapters;
    },
    GET_DOC: state => {
      return state.curDoc;
    },
  },

  mutations: {
    SET_DOCS : (state, {docs, chapters}) => {
      //console.log("SET_DOCS", docs.length, chapters.length);
      state.docs = docs;
      state.chapters = chapters;
    },

    DOC_LOADED : (state, doc) => {
      doc.content = doc.content.replace(/\n/g, "<br />");
      state.curDoc = doc;
      state.loading = false;
    },

  },

  actions: {
    LOAD_DOCS : ({ state, commit, rootState }) => {
      commit('START_LOADING');
      axios.get(config.httpserver + config.vendor + rootState.curCar + '/getdocs')
      .then( ({data}) => {
        commit('END_LOADING');
        let curlevel = 0, root = [], parent = root, cur = 0;

        data.chapters.forEach(item => {
              if (item.level>curlevel)
              {
                parent = cur;
                curlevel = item.level;
              }
              else if (item.level<curlevel)
              {
                curlevel = item.level;
                parent = cur.parent.parent;
              }
              cur = {title: item.chaptername, name: item.chaptername, parent: parent, id: item.id, checked: true};
              if (!parent.children)
                parent.children = [];
              parent.children.push(cur);

        });

        commit('SET_DOCS', {docs: data.rows, chapters: root.children});
        //console.log("STORE DOC loaded "+rootState.curCar+' ' + data.rows.length + ' ' + root.children.length);
      })
      .catch(error => {
        console.log("ERROR", error, config.httpserver + config.vendor + rootState.curCar + '/getdocs');
        commit('ERROR_LOADING', error);
      });

    },

    LOAD_DOC ({commit}, payload) {
      commit('START_LOADING');
      axios.get(`${config.httpserver}getdoc/?docid=${payload}`)
      .then(response => {
        commit('END_LOADING');
        commit('DOC_LOADED', response.data);
      })
      .catch(error => {
        console.log("ERROR", error, `${config.httpserver}getdoc/?docid=${payload}`);
        commit('ERROR_LOADING', error);
      });
    },
  


  },

};
