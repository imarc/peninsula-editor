/**
 * @function setAdminUrl
 * @param Object commit event object for Vuex commit
 */

export default function setAdminUrl ({ commit }, url) {
  commit('setAdminUrl', url)
}
