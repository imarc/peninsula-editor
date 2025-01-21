/**
 * @function setIsModuleMode
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value to for editing
 */

export default function setIsModuleMode (bool) {
  if (!bool) {
    this.unsetContext()
  }
  this.setIsModuleMode(bool)
}
