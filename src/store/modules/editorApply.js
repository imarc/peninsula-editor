/**
 * @function editorApply
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import editorOptions from './_editors'

export default function initialDataConstruct ({ commit }) {
  // Creates array of availible editors in content instance.
  this.state.editors = [...document.querySelectorAll('[data-editor]')]

  if (this.state.editors.length > 0) {
    commit('setEditingIsAvailible', true)
  }

  /**
   * Loops through each editor and determines which editor to apply.
   */
  this.state.editors.forEach(editor => {
    const editorType = editor.dataset.editor

    editorOptions[editorType](editor, commit)
  })
}
