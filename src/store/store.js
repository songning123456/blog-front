import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import {getLanguage} from '../lang';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showInfo: false,
        language: getLanguage()
    },
    mutations: {
        setShowInfo (state, showInfo) {
            state.showInfo = showInfo;
        },
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            Cookies.set('language', language);
        }
    },
    actions: {
        setLanguage ({commit}, language) {
            commit('SET_LANGUAGE', language);
        }
    }
});

export default store;


