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
import ImageUploader from 'vue-image-upload-resize'
import store from './store'
import adminBarData from './-adminBarData'
import adminBarMethods from './-adminBarMethods'
import adminBarComputed from './-adminBarComputed'
import FrontendNav from './components/FrontendNav.vue'
import EditingContent from './components/EditingContent.vue'
import ModulesList from './components/ModulesList.vue'
import ModulePrompt from './components/ModulePrompt.vue'
import ModuleSettings from './components/ModuleSettings.vue'
import ModuleHighlight from './components/ModuleHighlight.vue'
import EditorHighlight from './components/EditorHighlight.vue'
import ImagePrompt from './components/ImagePrompt.vue'
import Error from './components/Error.vue'

const adminBar = document.querySelector('.js-adminBar')

if (adminBar) {
  // eslint-disable-next-line no-new
  createApp({
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
    data: adminBarData,
    computed: adminBarComputed,
    mounted () {
      const updateLink = document.querySelector('link[rel="update"]')
      store.dispatch('getValidation')
      store.dispatch('getModules')
      store.dispatch('initialDataConstruct')
      store.dispatch('setLatestSavedData', this.collections)
      store.dispatch('editorApply')
      store.dispatch('moduleCollect')
      store.dispatch('setVueInstance', this)
      this.isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0

      if (window.location.hash.indexOf('#edit') !== -1) {
        store.dispatch('setAdminBarIsOpen', true)
      }

      if (updateLink) {
        store.dispatch(
          'setBackendUrl',
          document.querySelector('link[rel="update"]')
        )
      }
    },
    methods: adminBarMethods
  })
    .use(ImageUploader)
    .use(store)
    .mount(adminBar)
}
