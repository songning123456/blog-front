import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import {getLanguage} from '../lang';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        language: getLanguage(),
        blogger: {}
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            Cookies.set('language', language);
        },
        SET_BLOGGER: (state, blogger) => {
            state.blogger = blogger;
        }
    },
    actions: {
        setLanguage ({commit}, language) {
            commit('SET_LANGUAGE', language);
        }
    }
});

export default store;


