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
import { mapState } from 'pinia'
import store from '../store/index'

export default {
  computed: {
    ...mapState(store, ['collections', 'isSaving', 'adminBarIsOpen'])
  },
  methods: {
    async saveContent (event) {
      event.preventDefault()
      store.destroyEditors()
      await setTimeout(() => {
        store.initialDataConstruct()
        store.setLatestSavedData(this.collections)
        store.saveContent()
      }, 0)
    },
    cancelChanges (event) {
      event.preventDefault()
      store.resetContent()
    }
  }
}
</script>
