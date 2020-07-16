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

  this.state.CKEditors.forEach(editor => {
    editor.destroy()
    this.state.CKEditors = this.state.CKEditors.filter(
      CKEditor => CKEditor !== editor
    )
  })

  this.state.HTMLEditors.forEach(editor => {
    const newCode = editor.getCode()
    editor.editorRoot.dataset.editing = false
    editor.editorRoot.innerHTML = newCode
  })

  richTextNodes.forEach(node => {
    node.dataset.editing = false
  })

  simpleEditors.forEach(simpleEditor => {
    simpleEditor.contentEditable = false
  })

  this.dispatch('editorApply')
}
