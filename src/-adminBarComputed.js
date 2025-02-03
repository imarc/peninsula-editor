import { useMainStore } from './store/index.js'
import { mapState } from 'pinia'

const store = useMainStore()

/**
 * Computed State for Admin Bar top level
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

export default {
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
