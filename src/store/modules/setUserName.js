/**
 * @function setUserName
 * @param Object commit event object for Vuex commit
 */

export default function setUserName ({ commit }, userName) {
  commit('setUserName', userName)
}
