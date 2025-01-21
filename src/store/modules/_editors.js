/**
 * Functions for applying various editors,
 * intended to apply editor dynamically
 * based on attribute
 */

import CodeFlask from 'codeflask'
import loadScripts from './_loadScripts.js'
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js'
import CKPlugins from '../../ckplugins.js'

const editors = {
  /**
     * Apply Simple Text Editing
     */
  simpletext (node, commit) {
    node.addEventListener('click', () => {
      if (!this.adminBarIsOpen) {
        return true
      }

      node.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })

      node.addEventListener('drop', (e) => {
        e.preventDefault()
      })

      this.destroyEditors()

      // eslint-disable-next-line no-param-reassign
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
      if (node.dataset.editing === 'true' || !this.adminBarIsOpen) {
        return true
      }

      this.destroyEditors()

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
        updateSourceElementOnDestroy: true,
        ...ckconfig
      })
        .then(editor => {
          this.CKEditors.push(editor)

          editor.appliedAttributes = appliedAttributes

          setTimeout(() => {
            editor.sourceElement.focus()
          }, 0)
        })
        .catch(error => {
          console.error(error.stack)
        })

      // eslint-disable-next-line no-param-reassign
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
      if (node.dataset.editing === 'true' || !this.adminBarIsOpen) {
        return true
      }

      const flask = new CodeFlask(node, {
        language: 'html'
      })

      if ('dynamicContent' in node.dataset) {
        flask.updateCode(node.dataset.dynamicContent)
      }

      this.HTMLEditors.push(flask)

      const editorTextArea = node.querySelector('textarea')

      editorTextArea.focus()

      editorTextArea.addEventListener('blur', () => {
        const newCode = flask.getCode()
        flask.editorRoot.dataset.editing = false
        flask.editorRoot.innerHTML = newCode

        const scripts = [...flask.editorRoot.querySelectorAll('script')]

        if (scripts.length) {
          node.dataset.dynamicContent = newCode
          loadScripts(scripts)
        } else {
          delete node.dataset.dynamicContent
        }
      })

      // eslint-disable-next-line no-param-reassign
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
      if (!this.adminBarIsOpen) {
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
