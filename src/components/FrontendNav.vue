<template>
    <div class="cms-frontend-nav">
        <h2 class="title">
            Module Management
        </h2>
        <ul>
            <li v-for="container in containers" :key="container.dataset.moduleName">
                <a
                    href="#"
                    @click="setContext(container, $event)"
                    v-text="applyStartCase(container.dataset.moduleName)"
                />
            </li>
        </ul>
    </div>
</template>

<script>
import { startCase } from 'lodash'
import { mapState } from 'pinia'
import { useMainStore } from '../store/index.js'

export default {
  setup() {
    const store = useMainStore()
    return { store }
  },
  computed: {
    ...mapState(useMainStore, ['containers', 'modules']),
  },
  methods: {
    setContext (container, event) {
      event.preventDefault()
      const [correctModule] = this.modules.filter(
        module => module.node === container
      )
      this.store.setContext(correctModule)
    },
    applyStartCase (string) {
      return startCase(string)
    }
  }
}
</script>
