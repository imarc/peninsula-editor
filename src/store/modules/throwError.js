/**
 * @function setLatestSavedData
 * @param Object commit event object for Vuex commit
 * @param String Error Message
 */

export default function throwError({ commit }, error) {
    commit('setError', error);
}
