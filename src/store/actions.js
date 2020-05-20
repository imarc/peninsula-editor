/**
 * This aggregates all the actions that can be taken
 * on the store.
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 */

import initialDataConstruct from './modules/initialDataConstruct'
import editorApply from './modules/editorApply'
import moduleCollect from './modules/moduleCollect'
import setEditingIsAvailible from './modules/setEditingIsAvailible'
import setIsEditing from './modules/setIsEditing'
import closeModulesList from './modules/closeModulesList'
import updateModuleOrder from './modules/updateModuleOrder'
import destroyEditors from './modules/destroyEditors'
import setIsModuleMode from './modules/setIsModuleMode'
import setIsSelectingModule from './modules/setIsSelectingModule'
import addModule from './modules/addModule'
import removeModule from './modules/removeModule'
import closeModulePrompt from './modules/closeModulePrompt'
import openModuleSettings from './modules/openModuleSettings'
import closeModuleSettings from './modules/closeModuleSettings'
import setContext from './modules/setContext'
import resetListContext from './modules/resetListContext'
import getModules from './modules/getModules'
import saveContent from './modules/saveContent'
import setLatestSavedData from './modules/setLatestSavedData'
import resetContent from './modules/resetContent'
import setAdminBarIsOpen from './modules/setAdminBarIsOpen'
import getValidation from './modules/getValidation'
import setBackendUrl from './modules/setBackendUrl'
import throwError from './modules/throwError'

export default {
  initialDataConstruct,
  editorApply,
  moduleCollect,
  setEditingIsAvailible,
  setIsEditing,
  closeModulesList,
  updateModuleOrder,
  destroyEditors,
  setIsModuleMode,
  setIsSelectingModule,
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
  getValidation,
  setBackendUrl,
  throwError
}
