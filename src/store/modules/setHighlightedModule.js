/**
 * @function setHighlightedModule
 * @param Object commit event object for Vuex commit
 * @param HTMLElement node to be highlighted
 */

export default function setHighlightedModule ({ commit }, node) {
  commit('setHighlightedNode', node)
}
