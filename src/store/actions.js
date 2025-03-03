/**
 * This aggregates all the actions that can be taken
 * on the store.
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 */

import initialDataConstruct from './modules/initialDataConstruct.js'
import editorApply from './modules/editorApply.js'
import moduleCollect from './modules/moduleCollect.js'
import setIsEditing from './modules/setIsEditing.js'
import closeModulesList from './modules/closeModulesList.js'
import updateModuleOrder from './modules/updateModuleOrder.js'
import destroyEditors from './modules/destroyEditors.js'
import setIsModuleMode from './modules/setIsModuleMode.js'
import setIsSelectingModule from './modules/setIsSelectingModule.js'
import addModule from './modules/addModule.js'
import removeModule from './modules/removeModule.js'
import closeModulePrompt from './modules/closeModulePrompt.js'
import openModuleSettings from './modules/openModuleSettings.js'
import closeModuleSettings from './modules/closeModuleSettings.js'
import setContext from './modules/setContext.js'
import resetListContext from './modules/resetListContext.js'
import getModules from './modules/getModules.js'
import saveContent from './modules/saveContent.js'
import setLatestSavedData from './modules/setLatestSavedData.js'
import resetContent from './modules/resetContent.js'
import setAdminBarIsOpen from './modules/setAdminBarIsOpen.js'
import getValidation from './modules/getValidation.js'
import setBackendUrl from './modules/setBackendUrl.js'
import setHighlightedModule from './modules/setHighlightedModule.js'
import setVueInstance from './modules/setVueInstance.js'
import throwError from './modules/throwError.js'
import updateHighlights from './modules/updateHighlights.js'

export default {
  initialDataConstruct,
  editorApply,
  moduleCollect,
  setIsEditing,
  closeModulesList,
  updateModuleOrder,
  destroyEditors,
  setIsModuleMode,
  setIsSelectingModule,
  setHighlightedModule,
  addModule,
  removeModule,
  closeModulePrompt,
  openModuleSettings,
  closeModuleSettings,
  setContext,
  resetListContext,
  getModules,
  saveContent,
  setLatestSavedData,
  resetContent,
  setAdminBarIsOpen,
  setVueInstance,
  getValidation,
  setBackendUrl,
  throwError,
  updateHighlights
}
