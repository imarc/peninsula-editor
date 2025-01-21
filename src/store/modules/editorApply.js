/**
 * @function editorApply
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import editorOptions from './_editors.js'

export default function initialDataConstruct () {
  // Creates array of availible editors in content instance.
  this.editors = [...document.querySelectorAll('[data-editor]')]

  if (this.editors.length > 0) {
    commit('setEditingIsAvailible', true)
  }

  /**
   * Loops through each editor and determines which editor to apply.
   */
  this.editors.forEach(editor => {
    const editorType = editor.dataset.editor

    editorOptions[editorType](editor)
  })
}
