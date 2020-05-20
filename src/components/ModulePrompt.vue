<template>
  <section class="cms-prompt">
    <div class="cms-prompt-info">
      <h2 class="title">
        Add a Module
      </h2>
      <div v-if="!moduleIsSelected" class="cms-module-palette-wrapper">
        <div class="cms-module-palette">
          <button
            v-for="(value, key) in allowedModules"
            :key="key"
            class="cms-module-select"
            @click="promptForInformation(value, key)"
          >
            <span class="title" v-text="value.label"></span>
            <p
              v-if="value.description"
              class="description"
              v-text="value.description"
            ></p>
          </button>
        </div>
      </div>
      <section v-if="moduleIsSelected" class="cms-attribute-fields">
        <div class="text">
          <label for="name">Enter a unique name for this module</label>
          <input id="name" v-model="moduleAttributeData.name" type="text" />
        </div>
        <span v-for="(value, key) in selectedModule.attributes" :key="key">
          <div v-if="isArray(value.options)" class="select">
            <label for="cardReference" v-text="value.label"></label>
            <p
              v-if="selectedModule.attributes[key].note"
              class="note -info"
              v-text="selectedModule.attributes[key].note"
            ></p>
            <span>
              <select
                :id="moduleAttributeData[key]"
                v-model="moduleAttributeData[key]"
                name="cardReference"
              >
                <option
                  v-for="option in value.options"
                  :key="option.class"
                  :value="option.class"
                  v-text="option.label"
                ></option>
              </select>
            </span>
          </div>
          <div v-else class="text">
            <label :for="key" v-text="value.label"></label>
            <p
              v-if="selectedModule.attributes[key].note"
              class="note -info"
              v-text="selectedModule.attributes[key].note"
            ></p>
            <input
              :id="key"
              v-model="moduleAttributeData[key]"
              type="text"
              :placeholder="value.placeholder ? value.placeholder : ''"
            />
          </div>
        </span>
      </section>
      <button
        v-if="moduleIsSelected"
        class="link"
        @click="populateModule"
        @keyup.enter="populateModule"
      >
        + Insert Module
      </button>
      <a
        href="#"
        class="cms-prompt-cancel"
        @click="closeModulePrompt"
        @keyup.escape="closeModulePrompt"
      >
        Cancel
      </a>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { isArray } from 'lodash'
import store from '../store/index'

export default {

  data () {
    return {
      selectedModule: {},
      moduleAttributeData: {
        name: null
      },
      moduleIsSelected: false
    }
  },

  computed: {
    ...mapState(['availibleModules', 'context']),
    allowedModules () {
      const allowedModules = {}
      const contextModuleName = this.context.node.dataset.module
      const { allows } = this.availibleModules[contextModuleName]
      const allowsType = typeof this.availibleModules[contextModuleName].allows

      if (allowsType === 'boolean' && allows) {
        for (const key in this.availibleModules) {
          if (key !== 'section' && key !== 'section-simple') {
            allowedModules[key] = this.availibleModules[key]
          }
        }

        return allowedModules
      }

      for (const key in this.availibleModules) {
        if (
          this.availibleModules[contextModuleName].allows.indexOf(key) !== -1 &&
          key !== 'section' &&
          key !== 'section-simple'
        ) {
          allowedModules[key] = this.availibleModules[key]
        }
      }

      return allowedModules
    },
    notSameAsContext () {
      return this.context.node.dataset.module
    }
  },

  methods: {
    promptForInformation (value, key) {
      this.selectedModule = value
      this.selectedModule.key = key
      this.moduleIsSelected = true
    },
    populateModule () {
      const moduleData = {
        module: this.selectedModule,
        attributes: this.moduleAttributeData
      }

      store.dispatch('addModule', moduleData)
    },
    closeModulePrompt (event) {
      event.preventDefault()
      store.dispatch('closeModulePrompt')
    },
    isArray (value) {
      return isArray(value)
    }
  }
}
</script>
