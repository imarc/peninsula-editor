import { mapState } from 'vuex'

/**
 * Computed State for Admin Bar top level
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

const computed = {
  ...mapState([
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

export default computed
