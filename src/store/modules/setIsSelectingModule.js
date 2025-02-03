/**
 * @function setIsSelectingModule
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value for is selecting module
 */

export default function setIsSelectingModule (bool) {
  this.isSelectingModule = bool
}
