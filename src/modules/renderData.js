import axios from 'axios'
import Twig from 'twig'

function getParameters (dataset) {
  const obj = {}

  Object.keys(dataset).forEach(key => {
    if (key.indexOf('parameter') !== -1) {
      const parameter = key.replace('parameter', '').toLowerCase()
      obj[parameter] = dataset[key]
    }
  })

  return obj
}

async function renderData (moduleNode) {
  const { endpoint } = moduleNode.dataset
  const params = getParameters(moduleNode.dataset)
  const twigTemplate = typeof moduleNode.dataset.template !== 'undefined'
    ? moduleNode.dataset.template
    : moduleNode.innerHTML

  if (typeof moduleNode.dataset.template === 'undefined') {
    moduleNode.dataset.template = moduleNode.innerHTML
  }

  const data = await axios.get(endpoint, { params }).then(res => res.data.data)

  const template = Twig.twig({
    data: twigTemplate
  }).render({ data })

  moduleNode.innerHTML = template
}

export default renderData
