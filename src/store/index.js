/**
 * Store for managing state between multiple instances in the
 * content manager.
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton and Matthew Sahagian
 *
 */

// Dependencies
import { defineStore } from 'pinia';
import actions from './actions.js'
import mutations from './mutations.js'

// Define the store using Pinia
export const useMainStore = defineStore('main', {
  state: () => ({
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
    highlightedNode: null,
    editingNode: null,
    photoSelection: {
      isSelecting: false,
      node: null
    }
  }),
  actions: {
    ...mutations,
    ...actions,
  },
})
