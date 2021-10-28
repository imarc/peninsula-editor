/**
 * @function setAvatar
 * @param Object commit event object for Vuex commit
 */

export default function setAvatar ({ commit }, avatar) {
  commit('setAvatar', avatar)
}
