/**
 * @function setAdminBarIsOpen
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value to for editing
 */

export default function setAdminBarIsOpen (bool) {
  if (bool) {
    document.querySelector('body').classList.add('-editing')
    this.editorApply() // Re-initialize editors when editing mode is enabled
  } else {
    document.querySelector('body').classList.remove('-editing')
    this.destroyEditors() // Clean up editors when disabling edit mode
  }
  this.adminBarIsOpen = bool
}
