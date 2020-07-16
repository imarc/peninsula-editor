<template>
    <section class="cms-islet-error">
        <p v-text="error" />
        <button class="cms-close" @click="closeError" />
    </section>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'

export default {
  computed: {
    ...mapState(['error'])
  },
  methods: {
    closeError () {
      store.dispatch('throwError', null)
    }
  }
}
</script>
