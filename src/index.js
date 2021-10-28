/**
 * The manager is responsible for keeping track of editors, and handling the event interaction from the user.
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton and Matthew Sahagian
 *
 * TODO: Saving functionality
 */

// Dependencies
import Vue from 'vue'
import ImageUploader from 'vue-image-upload-resize'
import PeninsulaBase from './components/PeninsulaBase.vue'

Vue.use(ImageUploader)

export default function peninsulaEditor (element, {
  backendUrl = null,
  canEdit = false,
  adminUrl = null,
  avatar = null,
  userName = null,
  homeUrl = null,
  logoutUrl = null
} = {}) {
  console.log('test')
  const PeninsulaBaseCtor = Vue.extend(PeninsulaBase)
  new PeninsulaBaseCtor({
    propsData: {
      initialConfig: {
        backendUrl,
        canEdit,
        adminUrl,
        avatar,
        userName,
        homeUrl,
        logoutUrl
      }
    }
  }).$mount(element)
}
