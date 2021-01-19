/**
 * Functions for applying various attribute handlers,
 * uses key of attribute property.
 */

// eslint-disable-next-line func-names
const cssPropertyValueSupported = function (prop, value) {
  const d = document.createElement('div')
  d.style[prop] = value
  return d.style[prop] === value
}

const attributeHandlers = {
  /**
   * Default Attribute Handler
   */
  default (node, selectedModule, value, key) {
    let attributeModifiedElement = {}

    if (typeof node.dataset[key] !== 'undefined') {
      attributeModifiedElement = node
    } else {
      attributeModifiedElement = node.querySelector(`[data-${key}]`)
    }

    if (!attributeModifiedElement) {
      return
    }

    if (attributeModifiedElement && value) {
      attributeModifiedElement.setAttribute(key, value)
    }
  },

  /**
   * Class Attribute Handler
   */
  class (node, selectedModule, value, key) {
    let classModifiedElement = {}

    if (typeof node.dataset[key] !== 'undefined') {
      classModifiedElement = node
    } else {
      classModifiedElement = node.querySelector(`[data-${key}]`)
    }

    if (!classModifiedElement) {
      return
    }

    if (!value) {
      throw new Error(
        'Please select a style you would like'
      )
    }

    selectedModule.attributes[key].options.forEach(option => {
      classModifiedElement.classList.remove(option.class)
    })

    classModifiedElement.classList.add(value)
  },

  /**
   * Inline Width Handler
   */
  width (node, selectedModule, value, key) {
    let styleModifiedElement = {}

    if (typeof node.dataset[key] !== 'undefined') {
      styleModifiedElement = node
    } else {
      styleModifiedElement = node.querySelector(`[data-${key}]`)
    }

    if (cssPropertyValueSupported('width', value)) {
      styleModifiedElement.style.width = value
      styleModifiedElement.style.flexBasis = value
    } else {
      throw new Error(
        'Please provide a valid width in pixels or pecent. Example: "50px" or "50%".'
      )
    }
  }
}

export default attributeHandlers
