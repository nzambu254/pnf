import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    progressData: {}
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_PROGRESS_DATA(state, progressData) {
      state.progressData = progressData;
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('SET_USER', userData);
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout({ commit }) {
      commit('SET_USER', null);
      localStorage.removeItem('user');
    },
    updateProgress({ commit }, progressData) {
      commit('SET_PROGRESS_DATA', progressData);
    }
  },
  getters: {
    isAuthenticated: state => !!state.user
  }
});