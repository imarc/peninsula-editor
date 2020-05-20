/**
 * The manager is responsible for keeping track of editors, and handling the event interaction from the user.
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton and Matthew Sahagian
 *
 * TODO: Saving functionality
 */

// Dependencies
import Vue from 'vue';
import ImageUploader from 'vue-image-upload-resize';
import store from './src/store';
import adminBarData from './src/adminBarData';
import adminBarMethods from './src/adminBarMethods';
import adminBarComputed from './src/adminBarComputed';
import FrontendNav from './src/components/FrontendNav.vue';
import EditingContent from './src/components/EditingContent.vue';
import ModulesList from './src/components/ModulesList.vue';
import ModulePrompt from './src/components/ModulePrompt.vue';
import ModuleSettings from './src/components/ModuleSettings.vue';
import ImagePrompt from './src/components/ImagePrompt.vue';
import Error from './src/components/Error.vue';

Vue.use(ImageUploader);
const adminBar = document.querySelector('.js-adminBar');

if (adminBar) {
    // eslint-disable-next-line no-new
    new Vue({
        el: adminBar,
        components: {
            FrontendNav,
            EditingContent,
            ModulesList,
            ModulePrompt,
            ModuleSettings,
            ImagePrompt,
            Error,
        },
        data: adminBarData,
        computed: adminBarComputed,
        mounted() {
            const updateLink = document.querySelector('link[rel="update"]');
            store.dispatch('getValidation');
            store.dispatch('getModules');
            store.dispatch('initialDataConstruct');
            store.dispatch('setLatestSavedData', this.collections);
            store.dispatch('editorApply');
            store.dispatch('moduleCollect');
            this.isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

            if (location.hash.indexOf('#edit') !== -1) {
                store.dispatch('setAdminBarIsOpen', true);
            }

            if (updateLink) {
                store.dispatch(
                    'setBackendUrl',
                    document.querySelector('link[rel="update"]')
                );
            }
        },
        methods: adminBarMethods,
        store,
    });
}
