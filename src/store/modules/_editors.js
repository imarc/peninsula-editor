/**
 * Functions for applying various editors,
 * intended to apply editor dynamically
 * based on attribute
 */

import CodeFlask from 'codeflask'
import loadScripts from './_loadScripts.js'
import { InlineEditor } from 'ckeditor5'
import CKPlugins from '../../ckplugins.js'
import { useMainStore } from '../index.js'

const editors = {
  /**
     * Apply Simple Text Editing
     */
  simpletext (node) {
    node.addEventListener('click', () => {
      const store = useMainStore()
      if (!store.adminBarIsOpen) {
        return true
      }

      node.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })

      node.addEventListener('drop', (e) => {
        e.preventDefault()
      })

      store.destroyEditors()

      // eslint-disable-next-line no-param-reassign
      node.contentEditable = true
      node.focus()


      store.setIsEditing(true)
      store.setEditingNode(node)

      return true
    })
  },

  /**
     * Apply Rich Text Editing
     */
  richtext (node) {
    // Gracefully fall back to simple if IE
    if (window.document.documentMode) {
      this.simpletext(node)
      return true
    }

    node.addEventListener('click', () => {
      const store = useMainStore()
      if (node.dataset.editing === 'true' || !store.adminBarIsOpen) {
        return true
      }

      store.destroyEditors()

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
        licenseKey: 'GPL',
        ...ckconfig
      })
        .then(editor => {
          store.CKEditors.push(editor)

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

      store.setIsEditing(true)
      store.setEditingNode(node)

      return true
    })

    return true
  },

  /**
     * Apply HTML Editing
     */
  html (node) {
    node.addEventListener('click', () => {
      const store = useMainStore()
      if (node.dataset.editing === 'true' || !store.adminBarIsOpen) {
        return true
      }

      const flask = new CodeFlask(node, {
        language: 'html'
      })

      if ('dynamicContent' in node.dataset) {
        flask.updateCode(node.dataset.dynamicContent)
      }

      store.HTMLEditors.push(flask)

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

      store.setIsEditing(true)
      store.setEditingNode(node)

      return true
    })
  },

  /**
     * Image Upload
     */
  image (node) {
    node.addEventListener('click', event => {
      const store = useMainStore()
      if (!store.adminBarIsOpen) {
        return true
      }

      event.preventDefault()

      store.setPhotoSelection({
        isSelecting: true,
        node
      })

      store.setIsEditing(true)
      store.setEditingNode(node)

      return true
    })
  }
}

export default editors
