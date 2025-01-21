/**
 * @function moduleCollect
 * @param Object commit event object for Vuex commit
 * @param Object If provided, node in which to scope collection of modules
 */

// Dependencies
import uuidv4 from 'uuid/v4.js'

// eslint-disable-next-line no-unused-vars
export default function moduleCollect (parentNode) {
  /**
     * Sets context, either top of the whole content instance,
     * or, if provided, a specific point in a DOM tree
     */
  const parentCollectContext = parentNode || document

  /**
     * If no specific node is provided, define top level nodes for use in menu
     */
  if (!parentNode) {
    this.modules = []
    this.containers = [
      ...parentCollectContext.querySelectorAll('[data-module="section"]'),
      ...parentCollectContext.querySelectorAll('[data-module="section-simple"]')
    ]
  }

  /**
     * All modules within scope
     */
  const availibleModules = [...parentCollectContext.querySelectorAll('[data-module]')]

  /**
     * If a node is provided, it itself is always a module.
     * Adding to array of modules.
     */
  if (parentNode) {
    availibleModules.push(parentNode)
  }

  /**
     * Iterates through each module, and creates an object to represent in state.
     */
  availibleModules.forEach(module => {
    /**
         * Defining its relation to modules above and below it.
         */
    const moduleChildren = [...module.children]
    const directModules = moduleChildren.filter(node => node.dataset.module)
    let parentContext = module.parentElement.dataset.module
      ? module.parentElement
      : null

    if (!parentContext && parentNode) {
      parentContext = this.context.node
    }

    this.modules.push({
      node: module,
      id: uuidv4(),
      nestedModules: directModules,
      parentContext
    })
  })
}
