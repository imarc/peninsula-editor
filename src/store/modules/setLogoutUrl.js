/**
 * @function setLogoutUrl
 * @param Object commit event object for Vuex commit
 */

export default function setLogoutUrl ({ commit }, url) {
  commit('setLogoutUrl', url)
}
