const hasOwnProperty = Object.hasOwnProperty;

export default function proxy(actions) {
  const ret = {};
  for (let key in actions) {
    if (hasOwnProperty.call(actions, key)) {
      ret[key] = async function () {
        try {
          return await actions[key](...arguments);
        } catch (e) {
          const { dispatch } = arguments[0];
          return dispatch('Common/error', e, { root: true });
        }
      };
    }
  }
  return ret;
}
