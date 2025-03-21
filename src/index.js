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

  //import './styles/main.scss'

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
      return { store }
    },
    computed: {
      ...mapState(useMainStore, [
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
    },
    mounted() {
      const updateLink = document.querySelector('link[rel="update"]')
      this.store.getValidation()
      this.store.getModules()
      this.store.initialDataConstruct()
      this.store.setLatestSavedData(this.store.collections)
      this.store.editorApply()
      this.store.moduleCollect()
      this.store.setVueInstance(this)
      if (window.location.hash.indexOf('#edit') !== -1) {
        this.store.setAdminBarIsOpen(true)
      }

      if (updateLink) {
        this.store.setBackendUrl(document.querySelector('link[rel="update"]'))
      }
    },
    methods: adminBarMethods,
  })

  app.config.productionTip = false
  app.config.devtools = true
  
  const pinia = createPinia()
  app.use(pinia)
  app.mount(adminBar)
}
