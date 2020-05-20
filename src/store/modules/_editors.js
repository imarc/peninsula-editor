/**
 * Functions for applying various editors,
 * intended to apply editor dynamically
 * based on attribute
 */

import CodeFlask from 'codeflask'
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
// eslint-disable-next-line import/no-cycle
import store from '../index'

/**
 * Optionally store additional custom configuration in window
 * to customize the richtext editor for a specific society.
 */
const customConfig = window.customConfig || {}

const editors = {
  /**
   * Apply Simple Text Editing
   */
  simpletext (node, commit) {
    node.addEventListener('click', () => {
      if (!store.state.adminBarIsOpen) {
        return true
      }
      store.dispatch('destroyEditors')

      // eslint-disable-next-line no-param-reassign
      node.contentEditable = true
      node.focus()

      commit('setIsEditing', true)

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

      InlineEditor.create(node, {
        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Alignment,
          Autoformat,
          BlockQuote,
          Heading,
          Link,
          List,
          Table,
          TableToolbar
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'alignment',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'undo',
            'redo',
            'insertTable'
          ]
        },

        // Society specific config
        ...customConfig,
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        }
      })
        .then(editor => {
          store.state.CKEditors.push(editor)

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

      const flask = new CodeFlask(node, {
        language: 'html'
      })

      store.state.HTMLEditors.push(flask)

      const editorTextArea = node.querySelector('textarea')

      editorTextArea.focus()

      editorTextArea.addEventListener('blur', () => {
        const newCode = flask.getCode()
        flask.editorRoot.dataset.editing = false
        flask.editorRoot.innerHTML = newCode
      })

      // eslint-disable-next-line no-param-reassign
      node.dataset.editing = true

      commit('setIsEditing', true)

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

      return true
    })
  }
}

export default editors
