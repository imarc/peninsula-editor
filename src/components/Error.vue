<template>
    <section class="cms-islet-error">
        <p v-text="error" />
        <button class="cms-close" @click="closeError" />
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
      ...mapState(useMainStore, ['error'])
  },
  methods: {
    closeError () {
      this.store.throwError(null)
    }
  }
}
</script>
