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
  setModules(modules) {
    this.availibleModules = modules;
  },
  setError(error) {
    this.error = error;
  },
  setContextModules(moduleData) {
    this.context.nestedModules = moduleData.map(module => module.node);
  },
  setToken(token) {
    this.token = token;
  },
  setIsSaving(bool) {
    this.isSaving = bool;
  },
  setPhotoSelection(object) {
    this.photoSelection = object;
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
  unsetContext() {
    this.context = null;
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
