/**
 * @function updateHighlights
 * @param Object commit event object for Vuex state
 */

export default function updateHighlights () {
  const tempEditors = this.editors
  this.editors = []
  this.editors = tempEditors
}
