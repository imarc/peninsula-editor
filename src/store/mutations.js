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
  setAdminUrl (state, url) {
    state.adminUrl = url
  },
  setAvatar (state, avatar) {
    state.avatar = avatar
  },
  setUserName (state, userName) {
    state.userName = userName
  },
  setHomeUrl (state, url) {
    state.homeUrl = url
  },
  setLogoutUrl (state, url) {
    state.logoutUrl = url
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
  setEditingNode (state, node) {
    state.editingNode = node
  },
  setHighlightedNode (state, node) {
    state.highlightedNode = node
  },
  unsetContext (state) {
    state.context = null
  },
  setVueInstance (state, instance) {
    state.vueInstance = instance
  },
  setCanEdit (state, bool) {
    state.canEdit = bool
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
