/**
 * Methods for top level AdminBar Instance
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */
import { useMainStore } from './store/index.js'

export default {
  openAdminBar (event) {
    event.preventDefault()
    const store = useMainStore()
    store.setAdminBarIsOpen(true)
  },
  closeAdminBar (event) {
    event.preventDefault()
    const store = useMainStore()
    store.setAdminBarIsOpen(false)
  }
}
