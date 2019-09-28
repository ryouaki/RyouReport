import proxy from '@/store/proxy';

export default {
  namespaced: true,
  state: {
    error: null,
    userInfo: null
  },
  mutations: {
    ERROR(state, exception) {
      state.error = exception;
    }
  },
  actions: proxy({
    async error(context, exception) {
      context.commit('ERROR', exception);
      setTimeout(() => {
        context.commit('ERROR', null);
      }, 2000);
    }
  })
};
