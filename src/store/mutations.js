/**
 * Mutations for store
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

export default {
  addModuleToContext (state, node) {
    state.context.nestedModules.push(node)
  },
  setIsEditing (state, bool) {
    state.isEditing = bool
  },
  setEditingIsAvailible (state, bool) {
    state.editingIsAvailible = bool
  },
  setIsModuleMode (state, bool) {
    state.isModuleMode = bool
  },
  setModules (state, modules) {
    state.availibleModules = modules
  },
  setAdminBarIsOpen (state, bool) {
    state.adminBarIsOpen = bool
  },
  setError (state, error) {
    state.error = error
  },
  setContextModules (state, moduleData) {
    state.context.nestedModules = moduleData.map(module => module.node)
  },
  setIsSelectingModule (state, bool) {
    state.isSelectingModule = bool
  },
  setToken (state, token) {
    state.token = token
  },
  setBackendUrl (state, url) {
    state.backendUrl = url
  },
  setIsSaving (state, bool) {
    state.isSaving = bool
  },
  setPhotoSelection (state, object) {
    state.photoSelection = object
  },
  setLatestSavedData (state, object) {
    this.state.latestSavedData = object
  },
  setCurrentModule (state, module) {
    state.currentModule = module
  },
  setContext (state, module) {
    state.context = module
  },
  setIsUpdatingModule (state, bool) {
    state.isUpdatingModule = bool
  },
  unsetContext (state) {
    state.context = null
  },
  removeModuleData (state, moduleDataToRemove) {
    state.modules = state.modules.filter(
      module => moduleDataToRemove.indexOf(module) === -1
    )
  },
  removeContainerData (state, containerNames) {
    state.containers = state.containers.filter(
      container => containerNames.indexOf(container.containerName) === -1
    )
  }
}
