/**
 * Mutations for store
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */

export default {
  setPhotoSelection(object) {
    this.photoSelection = object;
  },
  setEditingNode(node) {
    this.editingNode = node;
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
