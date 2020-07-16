/**
 * @function updateHighlights
 * @param Object commit event object for Vuex state
 */

export default function updateHighlights ({ state }) {
  const tempEditors = state.editors
  state.editors = []
  state.editors = tempEditors
}
