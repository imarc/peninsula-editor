/**
 * Methods for top level AdminBar Instance
 *
 * Copyright 2019, Imarc Agency, All rights reserved.
 * Authors: Tristan Norton
 *
 */
import store from './store';

export default {
    openAdminBar(event) {
        event.preventDefault();
        store.dispatch('setAdminBarIsOpen', true);
    },
    closeAdminBar(event) {
        event.preventDefault();
        store.dispatch('setAdminBarIsOpen', false);
    },
};
