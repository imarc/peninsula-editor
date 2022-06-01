/**
 * @function destroyEditors
 */

export default function destroyEditors () {
  /**
     * Scans DOM for all simple editor instances
     */
  const simpleTextNode = [...document.querySelectorAll('[data-editor="simpletext"]')]
  const richTextNodes = [...document.querySelectorAll('[data-editor="richtext"]')]
  const htmlNodes = [...document.querySelectorAll('[data-editor="html"]')]

  /**
     * Destory Everything
     */

  if (this.state.CKEditor) {
    this.state.CKEditor.destroy()

    if (typeof this.state.CKEditor.appliedAttributes !== 'undefined') {
      setTimeout(() => {
        Object.keys(this.state.CKEditor.appliedAttributes).forEach(key => {
          const node = document.querySelector(`a[href="${key}"]`)
          if (node) {
            node.download = this.state.CKEditor.appliedAttributes[key]
          }
        })
      }, 100)
    }
  }

  htmlNodes.forEach(node => {
    node.dataset.editing = false

    if (node.dataset.dynamicContent) {
      node.innerHTML = node.dataset.dynamicContent
    }
  })

  richTextNodes.forEach(node => {
    node.dataset.editing = false
  })

  simpleTextNode.forEach(node => {
    node.contentEditable = false
  })

  this.dispatch('editorApply')
}
