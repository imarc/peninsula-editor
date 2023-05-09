/**
 * @function destroyEditors
 */

export default function destroyEditors () {
  /**
     * Scans DOM for all simple editor instances
     */
  const simpleEditors = [...document.querySelectorAll('[data-editor="simpletext"]')]
  const richTextNodes = [...document.querySelectorAll('[data-editor="richtext"]')]

  /**
     * Destory Everything
     */

  this.state.CKEditors.forEach(async editor => {
    await editor.destroy()

    this.state.CKEditors = this.state.CKEditors.filter(
      CKEditor => CKEditor !== editor
    )

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
  })

  this.state.HTMLEditors.forEach(editor => {
    const newCode = editor.getCode() // HTML that was rendered INCLUDING html rendered by the scripts

    editor.editorRoot.dataset.editing = false

    if ('dynamicContent' in editor.editorRoot.dataset) {
      editor.editorRoot.innerHTML = editor.editorRoot.dataset.dynamicContent // Original HTML with scripts that HAVE NOT RUN
    } else {
      editor.editorRoot.innerHTML = newCode
    }
  })

  richTextNodes.forEach(node => {
    node.dataset.editing = false
  })

  simpleEditors.forEach(simpleEditor => {
    simpleEditor.contentEditable = false
  })

  this.dispatch('editorApply')
}
