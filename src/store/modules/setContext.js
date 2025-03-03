/**
 * @function setContext
 * @param Object commit event object for Vuex commit
 * @param Object Object of Module Representation
 */

export default function setContext (module) {
  console.log('setContext', module)
  this.context = module
  this.setIsModuleMode(true)
}
