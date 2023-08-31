/**
 * @function addModule
 * @param Object Commit event object for Vuex commit
 * @param Object Data object related to module addition
 */

// Dependencies
import { startCase } from 'lodash'
// eslint-disable-next-line import/no-cycle
import editorOptions from './_editors'
import attributeHandlers from './_attributeHandlers'
import { renderData } from '../../modules/renderData'

export default async function addModule ({ commit }, moduleData) {
  /**
   * Parses template as html and creates reference to module node
   */
  const domparser = new DOMParser()

  const moduleDocument = domparser.parseFromString(
    moduleData.module.template,
    'text/html'
  )
  const [node] = moduleDocument.body.children

  /**
   * Set module attributes
   */
  node.dataset.moduleName =
        moduleData.attributes.name || startCase(moduleData.module.key)
  node.dataset.module = moduleData.module.key

  node.id = node.dataset.moduleName.toLowerCase().replace(/\s/g, '-')

  /**
   * Look for additional attributes besides name and apply them
   */
  const errors = []

  Object.keys(moduleData.module.attributes).forEach(key => {
    const moduleConfig = moduleData.module.attributes[key]

    const handler =
            typeof moduleConfig.handler !== 'undefined'
              ? moduleConfig.handler
              : 'default'

    try {
      /**
       * Check if unique handler has been defined.
       */
      attributeHandlers[handler](
        node,
        moduleData.module,
        moduleData.attributes[key],
        key
      )
    } catch (error) {
      this.dispatch('throwError', error)
      errors.push(error)
    }
  })

  /**
   * Set Parameters if they Exist
   */
  if (typeof moduleData.module.parameters !== 'undefined') {
    Object.keys(moduleData.module.parameters).forEach(key => {
      node.setAttribute(`data-parameter-${key}`, moduleData.parameters[key])
    })
  }

  /**
   * Render Dynamic Data
   */
  if (typeof moduleData.module.data !== 'undefined') {
    node.dataset.endpoint = moduleData.module.data

    await renderData(node)
  }

  /**
   * If any errors are thrown on attribute validation, stop module population.
   */
  if (errors.length > 0) {
    return false
  }

  /**
   * Clear any error if valid.
   */
  this.dispatch('throwError', null)

  /**
   * Update state with new module(s)
   */
  commit('addModuleToContext', node)
  this.dispatch('moduleCollect', node)

  /**
   * If valid, flag that editing has occured.
   */
  commit('setIsEditing', true)

  /**
   * Applies editors if data-editor attributes exist
   */
  if (node.dataset.editor) {
    editorOptions[node.dataset.editor](node, commit)

    this.state.editors.push(node)
  } else {
    const newModuleEditors = [...node.querySelectorAll('[data-editor]')]

    newModuleEditors.forEach(editor => {
      const editorType = editor.dataset.editor

      this.state.editors.push(editor)

      editorOptions[editorType](editor, commit)
    })
  }

  /**
   * Populates node to current container,
   * closes prompt.
   */
  this.state.context.node.append(node)

  if ('handler' in moduleData.module) {
    window.moduleHandlers[moduleData.module.handler](node)
  }

  commit('setIsSelectingModule', false)
  this.dispatch('updateHighlights')

  return true
}
