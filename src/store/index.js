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
import state from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'

// Define the store using Pinia
export default defineStore('main', {
  state,
  actions: {
    ...mutations,
    ...actions,
  },
})
