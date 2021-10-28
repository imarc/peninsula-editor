/**
 * @function setHomeUrl
 * @param Object commit event object for Vuex commit
 */

export default function setHomeUrl ({ commit }, url) {
  commit('setHomeUrl', url)
}
