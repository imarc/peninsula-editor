/**
 * @function loadScripts Dynamically runs any scripts populated to page
 * @param  {Array} scripts Array of HTMLScriptElements
 */
async function loadScripts (scripts) {
  const scriptsWithSrc = scripts.filter(script => script.src)
  const inlineScripts = scripts.filter(script => !script.src)
  // inline scripts most likely rely on an external api, run first
  if (scriptsWithSrc.length) {
    await fetchExternalScripts(scriptsWithSrc)
  }
  if (inlineScripts.length) {
    runInlineScripts(inlineScripts)
  }
}

/**
 * @function runInlineScripts Evaluates any inline scripts
 * @param  {Array} scripts Array of HTMLScriptElements
 */
function runInlineScripts (scripts) {
  scripts.forEach(inlineScript => {
    // eslint-disable-next-line no-eval
    eval(inlineScript.innerHTML)
  })
}

/**
 * @function fetchExternalScripts Fetches any external scripts via src attribute
 * @param  {Array} scripts Array of HTMLScriptElements
 */
function fetchExternalScripts (scripts) {
  return new Promise((resolve, reject) => {
    const scriptPromises = scripts.map(scriptTag => new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script')
      scriptEl.onload = () => { resolve() }
      scriptEl.src = scriptTag.src
      document.body.appendChild(scriptEl)
    }))
    Promise.all(scriptPromises).then(resolve)
  })
}

export default loadScripts
