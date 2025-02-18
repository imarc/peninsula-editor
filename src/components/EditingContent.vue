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
import { useMainStore } from '../store/index.js'

export default {
  setup() {
    const store = useMainStore()
    return { store }
  },
  computed: {
    ...mapState(useMainStore, ['collections', 'isSaving', 'adminBarIsOpen']),
  },
  methods: {
    async saveContent (event) {
      event.preventDefault()
      this.store.destroyEditors()
      await setTimeout(() => {
        this.store.initialDataConstruct()
        this.store.setLatestSavedData(this.collections)
        this.store.saveContent()
      }, 0)
    },
    cancelChanges (event) {
      event.preventDefault()
      this.store.resetContent()
    }
  }
}
</script>
