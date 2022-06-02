/**
 * Functions for applying various editors,
 * intended to apply editor dynamically
 * based on attribute
 */

import CodeFlask from 'codeflask'
import loadScripts from './_loadScripts'
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'
import CKPlugins from '../../ckplugins'
import store from '../index'

const editors = {

  /**
   * Apply Simple Text Editing
   */
  simpletext (node, commit) {
    node.addEventListener('click', () => {
      if (node.dataset.editing === 'true' || !store.state.adminBarIsOpen) {
        return true
      }

      store.dispatch('destroyEditors')

      node.dataset.editing = true
      node.contentEditable = true
      node.focus()

      commit('setIsEditing', true)
      commit('setEditingNode', node)

      return true
    })
  },

  /**
   * Apply Rich Text Editing
   */
  richtext (node, commit) {
    // Gracefully fall back to simple if IE
    if (window.document.documentMode) {
      this.simpletext(node, commit)
      return true
    }

    node.addEventListener('click', () => {
      if (node.dataset.editing === 'true' || !store.state.adminBarIsOpen) {
        return true
      }

      store.dispatch('destroyEditors')

      const appliedAttributes = {}
      const downloadNodes = [...node.querySelectorAll('a[download]')]
      const ckconfig = window.ckconfig || {}

      if (downloadNodes.length) {
        downloadNodes.forEach(node => {
          const path = node.getAttribute('href')
          appliedAttributes[path] = node.download
        })
      }

      InlineEditor.create(node, {
        plugins: CKPlugins,
        ...ckconfig
      })
        .then(editor => {
          store.state.CKEditor = editor

          editor.appliedAttributes = appliedAttributes

          setTimeout(() => {
            editor.sourceElement.focus()
          }, 0)
        })
        .catch(error => {
          console.error(error.stack)
        })

      node.dataset.editing = true

      commit('setIsEditing', true)
      commit('setEditingNode', node)

      return true
    })

    return true
  },

  /**
   * Apply HTML Editing
   */
  html (node, commit) {
    node.addEventListener('click', () => {
      if (node.dataset.editing === 'true' || !store.state.adminBarIsOpen) {
        return true
      }

      store.dispatch('destroyEditors')

      const flask = new CodeFlask(node, {
        language: 'html'
      })

      if ('dynamicContent' in node.dataset) {
        flask.updateCode(node.dataset.dynamicContent)
      } 
      
      const editorTextArea = node.querySelector('textarea')

      editorTextArea.focus()

      editorTextArea.addEventListener('blur', () => {
        const newCode = flask.getCode()

        flask.editorRoot.dataset.editing = false
        flask.editorRoot.innerHTML = newCode

        const scripts = [...flask.editorRoot.querySelectorAll('script')]

        if (scripts.length) {
          loadScripts(scripts)
          node.dataset.dynamicContent = newCode
        } else {
          delete node.dataset.dynamicContent
        }
      })

      node.dataset.editing = true

      commit('setIsEditing', true)
      commit('setEditingNode', node)

      return true
    })
  },

  /**
   * Image Upload
   */
  image (node, commit) {
    node.addEventListener('click', event => {
      if (!store.state.adminBarIsOpen) {
        return true
      }

      event.preventDefault()

      commit('setPhotoSelection', {
        isSelecting: true,
        node
      })

      commit('setIsEditing', true)
      commit('setEditingNode', node)

      return true
    })
  }
}

export default editors
