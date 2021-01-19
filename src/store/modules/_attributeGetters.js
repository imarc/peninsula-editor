/**
 * Functions for Getting values of various attributes
 */

const attributeHandlers = {
  /**
     * Default Attribute Getters
     */
  default (node, attributeData, key) {
    let element = {}

    if (typeof node.dataset[key] !== 'undefined') {
      element = node
    } else {
      element = node.querySelector(`[data-${key}]`)
    }

    if (!element) {
      return ''
    }

    return element.getAttribute(key)
  },
  /**
     * Class Attribute Getters
     */
  class (node, attributeData, key) {
    let classModifiedElement = {}

    if (typeof node.dataset[key] !== 'undefined') {
      classModifiedElement = node
    } else if (node.querySelector(`[data-${key}]`)) {
      classModifiedElement = node.querySelector(`[data-${key}]`)
    } else {
      classModifiedElement = node.querySelector('[data-class]')
    }

    if (!classModifiedElement) {
      return
    }

    const classes = [...classModifiedElement.classList]
    let currentSelectedClass = ''

    classes.forEach(styleClass => {
      attributeData.options.forEach(option => {
        if (option.class === styleClass) {
          currentSelectedClass = option.class
        }
      })
    })

    return currentSelectedClass
  },

  /**
     * Inline Width Style Getters
     */
  width (node, attributeData, key) {
    let styleModifiedElement = {}

    if (typeof node.dataset[key] !== 'undefined') {
      styleModifiedElement = node
    } else {
      styleModifiedElement = node.querySelector(`[data-${key}]`)
    }

    return styleModifiedElement.style.width
  }
}

export default attributeHandlers
