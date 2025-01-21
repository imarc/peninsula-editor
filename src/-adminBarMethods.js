/**
 * Methods for top level AdminBar Instance
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */
import store from './store/index.js'

export default {
  openAdminBar (event) {
    event.preventDefault()
    store.setAdminBarIsOpen(true)
  },
  closeAdminBar (event) {
    event.preventDefault()
    store.setAdminBarIsOpen(false)
  }
}
