/**
 * @function resetListContext
 * @param Object commit event object for Vuex commit
 */

export default function resetListContext () {
  /**
     * NOTE: Yes this is hacky, if I figure out a way to remount
     * the list component in a better way that doesn't require
     * statechange I'll update it.
     */
  const tempContextRef = this.context

  this.setIsModuleMode(false)
  this.setContext(tempContextRef)
  setTimeout(() => this.setIsModuleMode(true), 0)
}
