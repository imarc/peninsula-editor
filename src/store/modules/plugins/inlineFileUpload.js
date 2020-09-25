import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview'

import uploadIcon from './upload.svg'
import store from '../../'

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
    const response = await axios
      .post('/api/v1/cms/files/', uri, {
        headers: {
          'X-CSRF-Token': store.state.token,
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
    const [file] = this.fileUpload.files
    const dataURI = await this.toBase64(file)

    const location = await this.uploadFile(dataURI)

    this.editor.execute('link', location)
    const newLink = this.editor.sourceElement.querySelector('.ck-link_selected')
    newLink.download = file.name
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
    console.log(this.editor.getData())
    this.confirmEl.classList.add('-active')
  }

  /**
   * @function closeFileUpload
   */
  closeFileUpload () {
    console.log(this)
    const { style } = this.fileUi
    this.confirmEl.classList.remove('-active')
    this.fileUpload.value = ''

    style.top = '-9999px'
    style.left = '-9999px'
  }
}
