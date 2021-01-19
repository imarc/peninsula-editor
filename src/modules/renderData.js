import axios from 'axios'
import Twig from 'twig'
import queryString from 'query-string'

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
  const domparser = new window.DOMParser()
  const { endpoint } = moduleNode.dataset
  const moduleParams = getParameters(moduleNode.dataset)

  const moduleData = await axios.get('/api/v1/cms/modules/')
    .then(response => {
      return response.data[moduleNode.dataset.module]
    })
  const parsedDocument = domparser.parseFromString(moduleData.template, 'text/html')
  const [element] = parsedDocument.body.children
  const twigTemplate = element.innerHTML

  const baseEndpointUrl = endpoint.split('?')[0]
  const existingParams = queryString.parse(endpoint.split('?')[1])

  const finalModuleParams = {}

  Object.keys(moduleParams).forEach(moduleParam => {
    if (moduleParams[moduleParam] !== 'undefined' && moduleParams[moduleParam] !== '') {
      finalModuleParams[moduleParam] = moduleParams[moduleParam]
    }
  })

  const data = await axios.get(baseEndpointUrl, {
    params: {
      ...finalModuleParams,
      ...existingParams
    }
  }).then(res => res.data.data)

  console.log(data)

  const template = Twig.twig({
    data: twigTemplate
  }).render({ data })

  moduleNode.innerHTML = template
}

export { getParameters, renderData }
