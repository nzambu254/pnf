import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    progressData: {},
    loading: false,
    error: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_PROGRESS_DATA(state, progressData) {
      state.progressData = progressData;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async login({ commit }, userData) {
      try {
        commit('SET_LOADING', true);
        // Add any authentication logic here
        commit('SET_USER', userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    logout({ commit }) {
      commit('SET_USER', null);
      localStorage.removeItem('user');
    },
    async updateProgress({ commit }, progressData) {
      try {
        commit('SET_LOADING', true);
        commit('SET_PROGRESS_DATA', progressData);
        // Add any API calls to save progress
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    isLoading: state => state.loading
  }
});