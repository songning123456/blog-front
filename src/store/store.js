import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showInfo: false
    },
    mutations: {
        setShowInfo(state, showInfo) {
            state.showInfo = showInfo;
        }
    }
});

export default store;


