/**
 * Functions for applying various editors,
 * intended to apply editor dynamically
 * based on attribute
 */

import { basicSetup } from 'codemirror'
import { EditorView, gutter, lineNumbers } from '@codemirror/view'
import loadScripts from './_loadScripts.js'
import { InlineEditor } from 'ckeditor5'
import CKPlugins from '../../ckplugins.js'
import { useMainStore } from '../index.js'
import { Flmngr } from 'flmngr'

const BOUND_EDITOR_EVENTS = Symbol('peninsula.boundEditorEvents')

const minHeightEditor = EditorView.theme({
  '.cm-content, .cm-gutter': { minHeight: '6lh' }
})

function bindEditorEventOnce (node, editorType, eventName, handler) {
  if (!node[BOUND_EDITOR_EVENTS]) {
    node[BOUND_EDITOR_EVENTS] = new Set()
  }

  const bindingKey = `${editorType}:${eventName}`

  if (node[BOUND_EDITOR_EVENTS].has(bindingKey)) {
    return
  }

  node.addEventListener(eventName, handler)
  node[BOUND_EDITOR_EVENTS].add(bindingKey)
}

const editors = {
  /**
   * Apply Simple Text Editing
   */
  simpletext (node) {
    bindEditorEventOnce(node, 'simpletext', 'click', () => {
      const store = useMainStore()
      if (!store.adminBarIsOpen) {
        return true
      }

      node.addEventListener('dragstart', event => {
        event.preventDefault()
      })

      node.addEventListener('drop', event => {
        event.preventDefault()
      })

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

    const store = useMainStore()
    const appliedAttributes = {}
    const downloadNodes = [...node.querySelectorAll('a[download]')]
    const ckconfig = window.ckconfig || {}

    if (downloadNodes.length) {
      downloadNodes.forEach(downloadNode => {
        const path = downloadNode.getAttribute('href')
        appliedAttributes[path] = downloadNode.download
      })
    }

    bindEditorEventOnce(node, 'richtext', 'click', () => {
      const currentStore = useMainStore()
      if (!currentStore.adminBarIsOpen) {
        return true
      }

      if (!node.ckeditorInstance) {
        console.log('initializing CKEditor')
        InlineEditor.create(node, {
          plugins: CKPlugins,
          updateSourceElementOnDestroy: true,
          licenseKey: 'GPL',
          ...ckconfig
        })
          .then(editor => {
            console.log('CKEditor initialized', editor, store.editingNode)
            store.CKEditors.push(editor)
            editor.appliedAttributes = appliedAttributes

            if (editor.sourceElement === store.editingNode) {
              editor.ui.view.panel.attachTo({
                target: node,
                positions: [
                  (targetRect, balloonRect) => ({
                    top: targetRect.top - balloonRect.height,
                    left: targetRect.left,
                    name: 'toolbar',
                    withArrow: false
                  })
                ]
              })

              editor.editing.view.focus()
            }
          })
          .catch(error => {
            console.error(error.stack)
          })

        node.dataset.editing = true

        store.setIsEditing(true)
        store.setEditingNode(node)
      }
    })
  },

  /**
   * Apply HTML Editing
   */
  html (node) {
    bindEditorEventOnce(node, 'html', 'click', () => {
      const store = useMainStore()
      if (node.dataset.editing === 'true' || !store.adminBarIsOpen) {
        return true
      }

      const rawHTML = 'dynamicContent' in node.dataset
        ? node.dataset.dynamicContent
        : node.innerHTML

      /*
      const initialCode = rawHTML
        ? rawHTML.replace(/<script(\b|>)/gi, '&lt;script$1').replace(/<\/script>/gi, '&lt;/script>')
        : ''
      */
      const initialCode = rawHTML

      node.replaceChildren()

      const view = new EditorView({
        doc: initialCode,
        parent: node,
        contentHeight: 8,
        extensions: [
          basicSetup,
          minHeightEditor,
          lineNumbers(),
          gutter({ class: 'cm-gutter' })
        ]
      })

      view.focus()

      store.HTMLEditors.push(view)

      const teardown = () => {
        const newCode = view.state.doc.toString()
        view.destroy()
        node.dataset.editing = false
        node.innerHTML = newCode

        node.dataset.dynamicContent = newCode
        const scripts = [...node.querySelectorAll('script')]

        if (scripts.length) {
          loadScripts(scripts)
        }

        document.body.dispatchEvent(new Event('peninsula-html-teardown'))
      }

      const handlePointerDown = event => {
        if (view.dom.contains(event.target)) {
          return
        }

        document.removeEventListener('pointerdown', handlePointerDown)
        teardown()
      }

      document.addEventListener('pointerdown', handlePointerDown)

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
    bindEditorEventOnce(node, 'image', 'click', event => {
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
  },

  asset (node) {
    bindEditorEventOnce(node, 'asset', 'click', event => {
      const store = useMainStore()
      if (!store.adminBarIsOpen) {
        return true
      }

      const flmngrconfig = window.flmngrconfig || {}

      Flmngr.open({
        apiKey: flmngrconfig.apiKey,
        isMultiple: false,
        urlFileManager: '/assets',
        urlFiles: '/storage/assets',
        urlFileManager__CSRF: onSuccess => {
          onSuccess({
            headers: {
              'X-CSRF-TOKEN': store.token
            }
          })
        },
        onFinish: file => {
          node.src = file[0].url
        }
      })

      event.preventDefault()

      store.setIsEditing(true)
      store.setEditingNode(node)

      return true
    })
  }
}

export default editors
