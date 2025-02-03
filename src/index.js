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
import { useMainStore } from './store/index.js'
import { createPinia, mapState } from 'pinia'
import adminBarData from './-adminBarData.js'
import adminBarMethods from './-adminBarMethods.js'
import FrontendNav from './components/FrontendNav.vue'
import EditingContent from './components/EditingContent.vue'
import ModulesList from './components/ModulesList.vue'
import ModulePrompt from './components/ModulePrompt.vue'
import ModuleSettings from './components/ModuleSettings.vue'
import ModuleHighlight from './components/ModuleHighlight.vue'
import EditorHighlight from './components/EditorHighlight.vue'
import ImagePrompt from './components/ImagePrompt.vue'
import Error from './components/Error.vue'

import './styles/main.scss'

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
    setup() {
      const store = useMainStore()
      return {
        store,
        ...mapState(store, [
          'isEditing',
          'editingIsAvailible',
          'isModuleMode',
          'isSelectingModule',
          'isUpdatingModule',
          'adminBarIsOpen',
          'collections',
          'backendUrl',
          'photoSelection',
          'error',
          'highlightedNode',
          'editors'
        ])
      }
    },
    mounted() {
      console.log('starting')
      const updateLink = document.querySelector('link[rel="update"]')
      console.log('getting validation')
      this.store.getValidation()
      console.log('getting modules')
      this.store.getModules()
      console.log('initializing data')
      this.store.initialDataConstruct()
      console.log('setting latest saved data')
      this.store.setLatestSavedData(this.store.collections)
      console.log('applying editors')
      this.store.editorApply()
      console.log('collecting modules')
      this.store.moduleCollect()
      console.log('setting vue instance')
      this.store.setVueInstance(this)
      console.log('setting admin bar is open')
      if (window.location.hash.indexOf('#edit') !== -1) {
        this.setAdminBarIsOpen(true)
      }

      if (updateLink) {
        this.store.setBackendUrl(document.querySelector('link[rel="update"]'))
      }
    },
    methods: adminBarMethods,
  })
  
  const pinia = createPinia()
  app.use(pinia)
  app.mount(adminBar)
}
