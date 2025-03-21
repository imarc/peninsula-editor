import { toRaw } from 'vue'
import { useMainStore } from '../index.js'

/**
 * @function destroyEditors
 */

export default async function destroyEditors () {
  /**
     * Scans DOM for all simple editor instances
     */
  const simpleEditors = [...document.querySelectorAll('[data-editor="simpletext"]')]
  const richTextNodes = [...document.querySelectorAll('[data-editor="richtext"]')]

  const store = useMainStore()

  /**
     * Destory Everything
     */

  console.log('trying to destroy', store.CKEditors)

  if (Array.isArray(store.CKEditors)) {
    for (const ckeditor of store.CKEditors) {
      const editor = toRaw(ckeditor)
      await editor.destroy()

      if (typeof editor.appliedAttributes !== 'undefined') {
        setTimeout(() => {
          Object.keys(editor.appliedAttributes).forEach(key => {
            const node = document.querySelector(`a[href="${key}"]`)
            if (node) {
              node.download = editor.appliedAttributes[key]
            }
          })
        }, 100)
      }
    }
  }

  store.CKEditors = []

  store.HTMLEditors.forEach(editor => {
    const newCode = editor.getCode() // HTML that was rendered INCLUDING html rendered by the scripts
    editor.editorRoot.dataset.editing = false

    if ('dynamicContent' in editor.editorRoot.dataset) {
      editor.editorRoot.innerHTML = editor.editorRoot.dataset.dynamicContent // Original HTML with scripts that HAVE NOT RUN
    } else {
      editor.editorRoot.innerHTML = newCode
    }
    
    editor.destroy()
  })
  store.HTMLEditors = []

  richTextNodes.forEach(node => {
    node.dataset.editing = false
  })

  simpleEditors.forEach(simpleEditor => {
    simpleEditor.contentEditable = false
  })
}
