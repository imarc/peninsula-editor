/**
 * @function setEditingIsAvailible
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value to for editing
 */

export default function setEditingIsAvailible ({ commit }, bool) {
  commit('setEditingIsAvailible', bool)
}
