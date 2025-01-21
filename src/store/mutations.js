/**
 * Mutations for store
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

export default {
  addModuleToContext(node) {
    this.context.nestedModules.push(node);
  },
  setIsEditing(bool) {
    this.isEditing = bool;
  },
  setEditingIsAvailible(bool) {
    this.editingIsAvailible = bool;
  },
  setIsModuleMode(bool) {
    this.isModuleMode = bool;
  },
  setModules(modules) {
    this.availibleModules = modules;
  },
  setAdminBarIsOpen(bool) {
    this.adminBarIsOpen = bool;
  },
  setError(error) {
    this.error = error;
  },
  setContextModules(moduleData) {
    this.context.nestedModules = moduleData.map(module => module.node);
  },
  setIsSelectingModule(bool) {
    this.isSelectingModule = bool;
  },
  setToken(token) {
    this.token = token;
  },
  setBackendUrl(url) {
    this.backendUrl = url;
  },
  setIsSaving(bool) {
    this.isSaving = bool;
  },
  setPhotoSelection(object) {
    this.photoSelection = object;
  },
  setLatestSavedData(object) {
    this.latestSavedData = object;
  },
  setCurrentModule(module) {
    this.currentModule = module;
  },
  setContext(module) {
    this.context = module;
  },
  setIsUpdatingModule(bool) {
    this.isUpdatingModule = bool;
  },
  setEditingNode(node) {
    this.editingNode = node;
  },
  setHighlightedNode(node) {
    this.highlightedNode = node;
  },
  unsetContext() {
    this.context = null;
  },
  setVueInstance(instance) {
    this.vueInstance = instance;
  },
  removeModuleData(moduleDataToRemove) {
    this.modules = this.modules.filter(
      module => moduleDataToRemove.indexOf(module) === -1
    );
  },
  removeContainerData(containerNames) {
    this.containers = this.containers.filter(
      container => containerNames.indexOf(container.containerName) === -1
    );
  }
}
