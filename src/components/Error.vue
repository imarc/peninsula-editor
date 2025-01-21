<template>
    <section class="cms-islet-error">
        <p v-text="error" />
        <button class="cms-close" @click="closeError" />
    </section>
</template>

<script>
import { mapState } from 'pinia'
import store from '../store/index'

export default {
  computed: {
    ...mapState(store, ['error'])
  },
  methods: {
    closeError () {
      store.throwError(null)
    }
  }
}
</script>
