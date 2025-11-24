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

  store.HTMLEditors.forEach(rawEditor => {
    const editor = toRaw(rawEditor)
    const container = editor && editor.dom ? editor.dom.parentNode : null

    if (!container) {
      return
    }

    const newCode = editor.state.doc.toString()
    editor.destroy()

    container.dataset.editing = false
    const restored = 'dynamicContent' in container.dataset ? container.dataset.dynamicContent : newCode
    container.dataset.dynamicContent = restored
    container.innerHTML = restored
  })
  store.HTMLEditors = []

  richTextNodes.forEach(node => {
    node.dataset.editing = false
  })

  simpleEditors.forEach(simpleEditor => {
    simpleEditor.contentEditable = false
  })
}
