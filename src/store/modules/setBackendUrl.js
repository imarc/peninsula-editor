/**
 * @function setBackendUrl
 * @param Object commit event object for Vuex commit
 * @param Object Object of Module Representation
 */

export default function setBackendUrl (node) {
  this.backendUrl = node.href
}
