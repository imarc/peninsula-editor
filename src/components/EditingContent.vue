<template>
    <section
        key="isEditingContent"
        class="cms-editing-content js-toolbar"
        :class="{ '-open': adminBarIsOpen }"
    >
        <h2 class="title">
            Editing Page Content
        </h2>
        <div class="actions">
            <a href="#" class="cancel" @click="cancelChanges">
                Cancel
            </a>
            <a
                href="#"
                :class="{ '-processing': isSaving }"
                class="cms- action"
                @click="saveContent"
            >
                Save
            </a>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store/index';

export default {
    computed: {
        ...mapState(['collections', 'isSaving', 'adminBarIsOpen']),
    },
    methods: {
        saveContent(event) {
            event.preventDefault();
            store.dispatch('destroyEditors');
            setTimeout(() => {
                store.dispatch('initialDataConstruct');
                store.dispatch('setLatestSavedData', this.collections);
                store.dispatch('saveContent');
            }, 0);
        },
        cancelChanges(event) {
            event.preventDefault();
            store.dispatch('resetContent');
        },
    },
};
</script>
