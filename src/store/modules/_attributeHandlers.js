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
      throw new Error(
        'It appears this module has been updated since it was inserted on to this page. Try removing and reinserting it so it is up to date.'
      )
    }

    if (attributeModifiedElement) {
      attributeModifiedElement[key] = value || ''
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
      throw new Error(
        'It appears this module has been updated since it was inserted on to this page. Try removing and reinserting it so it is up to date.'
      )
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

    if (!styleModifiedElement) {
      throw new Error(
        'It appears this module has been updated since it was inserted on to this page. Try removing and reinserting it so it is up to date.'
      )
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
