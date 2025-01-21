/**
 * The manager is responsible for keeping track of editors, and handling the event interaction from the user.
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton and Matthew Sahagian
 *
 * TODO: Saving functionality
 */

// Dependencies
import { createApp } from 'vue'
//import ImageUploader from 'vue-image-upload-resize'
import store from './store/index.js'
import adminBarData from './-adminBarData.js'
import adminBarMethods from './-adminBarMethods.js'
import adminBarComputed from './-adminBarComputed.js'
import FrontendNav from './components/FrontendNav.vue'
import EditingContent from './components/EditingContent.vue'
import ModulesList from './components/ModulesList.vue'
import ModulePrompt from './components/ModulePrompt.vue'
import ModuleSettings from './components/ModuleSettings.vue'
import ModuleHighlight from './components/ModuleHighlight.vue'
import EditorHighlight from './components/EditorHighlight.vue'
import ImagePrompt from './components/ImagePrompt.vue'
import Error from './components/Error.vue'

//Vue.use(ImageUploader)
const adminBar = document.querySelector('.js-adminBar')

if (adminBar) {
  const app = createApp({
    components: {
      FrontendNav,
      EditingContent,
      ModulesList,
      ModulePrompt,
      ModuleSettings,
      ModuleHighlight,
      EditorHighlight,
      ImagePrompt,
      Error
    },
    data: () => adminBarData,
    computed: adminBarComputed,
    mounted () {
      const updateLink = document.querySelector('link[rel="update"]')
      this.getValidation()
      this.getModules()
      this.initialDataConstruct()
      this.setLatestSavedData(this.collections)
      this.editorApply()
      this.moduleCollect()
      this.setVueInstance(this)
      this.isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0

      if (window.location.hash.indexOf('#edit') !== -1) {
        this.setAdminBarIsOpen(true)
      }

      if (updateLink) {
        this.setBackendUrl(document.querySelector('link[rel="update"]'))
      }
    },
    methods: adminBarMethods,
    store
  })

  app.mount(adminBar)
}
