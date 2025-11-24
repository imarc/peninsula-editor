/**
 * Functions for applying various editors,
 * intended to apply editor dynamically
 * based on attribute
 */

import { basicSetup } from 'codemirror'
import { EditorView, gutter, lineNumbers } from '@codemirror/view'
import loadScripts from './_loadScripts.js'
import { BalloonPanelView, InlineEditor } from 'ckeditor5'
import CKPlugins from '../../ckplugins.js'
import { useMainStore } from '../index.js'
import { Flmngr } from 'flmngr'

const minHeightEditor = EditorView.theme({
  ".cm-content, .cm-gutter": {minHeight: "6lh"}
})

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
      downloadNodes.forEach(node => {
        const path = node.getAttribute('href')
        appliedAttributes[path] = node.download
      })
    }

    node.addEventListener('click', () => {
      const store = useMainStore()
      if (!store.adminBarIsOpen) {
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
                    withArrow: false,
                  }),
                ],
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
    node.addEventListener('click', () => {
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
      const initialCode = rawHTML;

      node.replaceChildren()

      const view = new EditorView({
        doc: initialCode,
        parent: node,
        contentHeight: 8,
        extensions: [ basicSetup, minHeightEditor, lineNumbers(), gutter({ class: 'cm-gutter' }) ]
      })

      view.focus()

      store.HTMLEditors.push(view)

      const teardown = () => {
        // Ignore blur if focus remains inside the editor (e.g., scrollbar clicks)
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
  },

  asset (node) {
    node.addEventListener('click', event => {
      const store = useMainStore()
      if (!store.adminBarIsOpen) {
        return true
      }

      flmngrconfig = window.flmngrconfig || {}

      Flmngr.open({
        apiKey: flmngrconfig.apiKey,
        isMultiple: false,
        urlFileManager: '/assets',
        urlFiles: '/storage/assets',
        urlFileManager__CSRF: onSuccess => {
          onSuccess({
              headers: {
                  'X-CSRF-TOKEN': store.token
              },
          });
        },
        onFinish: file => {
            node.src = file[0].url
        },
      });

      event.preventDefault()

      store.setIsEditing(true)
      store.setEditingNode(node)

      return true
    })
  }
}

export default editors
