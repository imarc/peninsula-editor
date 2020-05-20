/**
 * State object for Vuex Store
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

export default {
  adminBarIsOpen: false,
  CKEditors: [],
  HTMLEditors: [],
  collections: {},
  fields: [],
  editors: [],
  containers: [],
  modules: [],
  context: {},
  isEditing: false,
  editingIsAvailible: false,
  isModuleMode: false,
  currentModule: {},
  isSelectingModule: false,
  isUpdatingModule: false,
  availibleModules: {},
  isSaving: false,
  latestSavedData: {},
  token: null,
  backendUrl: null,
  error: null,
  photoSelection: {
    isSelecting: false,
    node: null
  }
}
