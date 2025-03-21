import { Plugin, ButtonView, FileDialogButtonView } from 'ckeditor5'

import { useMainStore } from '../../index.js'

const uploadIcon = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>`

import axios from 'axios'

export default class FileUploadInline extends Plugin {
  /**
   * @function init
   */
  init () {
    const editor = this.editor

    this.fileUpload = document.querySelector('.js-fileUpload')
    this.fileUi = document.querySelector('.js-fileUploadUi')
    this.confirmEl = document.querySelector('.js-confirmUpload')
    this.cancelEl = document.querySelector('.js-cancelUpload')

    editor.ui.componentFactory.add('fileUploadInline', locale => {
      this.view = new ButtonView(locale)
      this.fileView = new FileDialogButtonView(locale)

      this.view.set({
        label: 'Upload File',
        icon: uploadIcon,
        tooltip: true
      })

      this.fileView.set({
        acceptedType: 'image/*',
        allowMultipleFiles: true
      })

      this.view.on('execute', this.setUploadUiCoords.bind(this))
      this.confirmEl.addEventListener('click', this.uploadConfirm.bind(this))
      this.cancelEl.addEventListener('click', this.closeFileUpload.bind(this))

      this.fileUpload.onchange = () => {
        this.setFileIsSelected()
      }

      return this.view
    })
  }

  /**
   * @function toBase64
   * @param  {type} file file data from file input
   * @return {type} URL parsed file data
   */
  toBase64 (file) {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
    })
  }

  /**
   * @function uploadFile
   * @param  {type} uri base64 string representing file
   * @return {type} url to uploaded file
   */
  async uploadFile (uri) {
    this.confirmEl.classList.remove('-active')
    this.fileUi.classList.add('-active')
    const store = useMainStore()
    const response = await axios
      .post('/api/v1/cms/files/', uri, {
        headers: {
          'X-CSRF-Token': store.token, // ! TODO make sure this still works
          'Content-Type': 'text/plain'
        }
      })

    this.fileUi.classList.remove('-active')

    return response.headers.location
  }

  /**
   * @function uploadConfirm
   */
  async uploadConfirm () {
    if (typeof this.editor.appliedAttributes === 'undefined') {
      this.editor.appliedAttributes = {}
    }

    const [file] = this.fileUpload.files
    const dataURI = await this.toBase64(file)

    const location = await this.uploadFile(dataURI)

    this.editor.execute('link', location)

    const newAnchor = document.querySelector(`a[href="${location}"]`)
    newAnchor.download = file.name
    this.editor.appliedAttributes[location] = file.name

    this.closeFileUpload()
  }

  /**
   * @function setUploadUiCoords
   */
  setUploadUiCoords () {
    const { element } = this.view
    const { x, y } = element.getBoundingClientRect()
    const { style } = this.fileUi

    const Xpos = x + window.pageXOffset - this.fileUi.offsetWidth + element.offsetWidth
    const Ypos = y + window.pageYOffset + element.offsetHeight

    style.top = `${Ypos}px`
    style.left = `${Xpos}px`
  }

  /**
   * @function setFileIsSelected
   */
  setFileIsSelected () {
    this.confirmEl.classList.add('-active')
  }

  /**
   * @function closeFileUpload
   */
  closeFileUpload () {
    const { style } = this.fileUi
    this.confirmEl.classList.remove('-active')
    this.fileUpload.value = ''

    style.top = '-9999px'
    style.left = '-9999px'
  }
}
