/**
 * @function setContext
 * @param Object commit event object for Vuex commit
 * @param Object Object of Module Representation
 */

export default function setContext (module) {
  this.setContext(module)
  this.setIsModuleMode(true)
}
