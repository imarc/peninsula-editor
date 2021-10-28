/**
 * @function setCanEdit
 * @param Object commit event object for Vuex commit
 * @param Object Object of Module Representation
 */

export default function setCanEdit ({ commit }, bool) {
  commit('setCanEdit', bool)
}
