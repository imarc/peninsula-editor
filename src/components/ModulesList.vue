<template>
    <div class="cms-modules">
        <a href="#" class="cms-return" @click="navigateUp">
            Return to
            <span v-text="parentContextName"></span>
        </a>
        <h2 class="title">
            <span v-text="contextName"></span>
            Modules
        </h2>
        <ul v-if="contextModules">
            <li
                v-for="module in contextModules"
                :key="module.id"
                :data-value="module.id"
                @dblclick="setContext(module, $event)"
            >
                <div
                    class="cms-module"
                    @mouseover="highlightModule(module, $event)"
                    @mouseleave="dehighlightModule"
                >
                    <div class="cms-moduleinfo js-dragHandle">
                        <h3 class="title" v-text="module.node.dataset.moduleName"></h3>
                        <p>
                            [
                            <span
                                v-text="applyStartCase(module.node.dataset.module)"
                            ></span>
                            ]
                        </p>
                    </div>
                    <div class="actions">
                        <a
                            v-if="hasNestedModules(module)"
                            href="#"
                            class="context"
                            @click="setContext(module, $event)"
                        >
                            Context
                        </a>
                        <a
                            href="#"
                            class="settings"
                            @click="openModuleSettings(module, $event)"
                        >
                            Settings
                        </a>
                        <a href="#" class="remove" @click="removeModule(module, $event)">
                            Remove
                        </a>
                    </div>
                </div>
            </li>
        </ul>
        <a href="#" class="cms-action" @click="openModuleSelect">+ Add a Module</a>
    </div>
</template>

<script>
import '../modules/append'
import { mapState } from 'pinia'
import { Sortable } from '@shopify/draggable'
import { startCase } from 'lodash'
import { useMainStore } from '../store/index.js'

export default {
  setup() {
    const store = useMainStore()
    return { store }
  },
  data () {
    return {
      moduleOrder: [],
      isDragging: false
    }
  },
  computed: {
    contextModules () {
      if (!this.store.context.nestedModules) {
        return []
      }
      return this.store.context.nestedModules.map(contextModule => {
        let correspondingModuleData = {}

        this.store.modules.forEach(module => {
          if (module.node === contextModule) {
            correspondingModuleData = module
          }
        })

        return correspondingModuleData
      })
    },
    parentContextName () {
      return this.store.context.parentContext
        ? this.store.context.parentContext.dataset.moduleName
        : 'List'
    },
    contextName () {
      if (this.store?.context?.node) {
        return this.store.context.node.dataset.moduleName
      }
      
      return null
    }
  },
  mounted () {
    this.initializeDraggable()
  },
  methods: {
    navigateUp (event) {
      event.preventDefault()

      if (this.store.context.parentContext) {
        const [parentModule] = this.store.modules.filter(
          module => module.node === this.store.context.parentContext
        )
        this.store.setContext(parentModule)

        return true
      }

      this.store.setIsModuleMode(false)

      return true
    },
    hasNestedModules (module) {
      return module.nestedModules.length > 0
    },
    highlightModule (module) {
      if (!this.isDragging) {
        module.node.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }

      this.store.setHighlightedModule(module.node)
    },
    dehighlightModule () {
      this.store.setHighlightedModule(null)
    },
    openModuleSelect (event) {
      event.preventDefault()
      this.store.setIsSelectingModule(true)
    },
    applyStartCase (string) {
      return startCase(string)
    },
    removeModule (module, event) {
      event.preventDefault()
      this.store.removeModule(module)
    },
    openModuleSettings (module, event) {
      event.preventDefault()
      this.store.openModuleSettings(module)
    },
    setContext (module, event) {
      if (this.hasNestedModules(module)) {
        event.preventDefault()
        this.store.setContext(module)
        module.node.classList.remove('-highlight')
      }
    },
    initializeDraggable () {
      const draggableContainer = this.$el.querySelector('ul')

      const sortable = new Sortable(draggableContainer, {
        draggable: 'li',
        handle: '.js-dragHandle'
      })

      sortable.on('sortable:stop', () => {
        const moduleElements = sortable.getDraggableElementsForContainer(
          draggableContainer
        )

        this.moduleOrder = moduleElements.map(
          moduleElement => moduleElement.dataset.value
        )

        this.store.updateModuleOrder(this.moduleOrder)
      })

      sortable.on('sortable:sort', () => {
        this.isDragging = true
      })

      sortable.on('sortable:stop', () => {
        this.isDragging = false
      })
    }
  }
}
</script>
