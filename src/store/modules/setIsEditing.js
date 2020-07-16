/**
 * @function setIsEditing
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value to for editing
 */

export default function setIsEditing({ commit }, bool) {
    commit('setIsEditing', bool);
}
