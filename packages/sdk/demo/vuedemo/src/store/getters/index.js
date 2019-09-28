export default {
  isLogin(state) {
    return state.Login.userInfo !== null;
  },
  sysError(state) {
    return state.Common.error || {};
  }
};
