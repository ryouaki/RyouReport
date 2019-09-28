import { doInit, doLogin, doLogout } from '@/api/login';
import proxy from '@/store/proxy';

export default {
  namespaced: true,
  state: {
    error: {},
    userInfo: null
  },
  mutations: {
    ERROR(state, error) {
      state.error = error;
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: proxy({
    async doInit(context) {
      const ret = await doInit();
      if (ret.code === 0) {
        context.commit('USERINFO', ret.data);
      }
    },
    async doLogin(context, params) {
      const ret = await doLogin(params);
      if (ret.code === 0) {
        context.commit('USERINFO', ret.data);
        context.commit('ERROR', {});
      } else {
        context.commit('ERROR', ret);
      }
    },
    async doLogout(context) {
      const ret = await doLogout();
      if (ret.code === 0) {
        context.commit('USERINFO', null);
      }
    }
  })
};
