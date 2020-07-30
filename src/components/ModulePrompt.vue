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
                        <div
                          v-if="key === 'href'"
                          @drop.prevent="dropAddFile"
                          @dragover.prevent="setFileFeedback"
                          @dragleave="removeFileFeedback"
                          class="file-upload"
                        >
                          <label :for="key" v-text="value.label"></label>
                          <p
                              v-if="selectedModule.attributes[key].note"
                              class="note -info"
                          >
                            <span v-text="selectedModule.attributes[key].note"></span> <a href="#" @click="manualAddFile">Or click here to upload.</a></p>
                          <input
                              :id="key"
                              v-model="moduleAttributeData[key]"
                              type="text"
                              :placeholder="value.placeholder ? value.placeholder : ''"
                          />
                          <transition name="fade-in">
                            <div class="file-feedback" v-if="fileFeedback">
                              <p class="message" v-text="fileFeedback"></p>
                            </div>
                          </transition>
                        </div>
                        <div v-else-if="key === 'download' && typeof moduleAttributeData.download !== 'undefined'">
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
                              v-else
                              :placeholder="value.placeholder ? value.placeholder : ''"
                          />
                        </div>
                        <div v-else-if="key !== 'download'">
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
                              v-else
                              :placeholder="value.placeholder ? value.placeholder : ''"
                          />
                        </div>
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
import axios from 'axios'
import store from '../store/index'

export default {
  data () {
    return {
      selectedModule: {},
      moduleAttributeData: {
        name: null
      },
      moduleIsSelected: false,
      fileFeedback: null
    }
  },
  computed: {
    ...mapState(['availibleModules', 'context', 'token']),
    allowedModules () {
      const allowedModules = {}
      const contextModuleName = this.context.node.dataset.module
      const { allows } = this.availibleModules[contextModuleName]
      const allowsType = typeof this.availibleModules[contextModuleName].allows

      if (allowsType === 'boolean' && allows) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in this.availibleModules) {
          if (key !== 'section' && key !== 'section-simple') {
            allowedModules[key] = this.availibleModules[key]
          }
        }

        return allowedModules
      }

      // eslint-disable-next-line no-restricted-syntax
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
    },
    async uploadFile (file) {
      this.fileFeedback = 'Uploading'
      const dataURI = await this.toBase64(file)

      const response = await axios
        .post('/api/v1/cms/files/', dataURI, {
          headers: {
            'X-CSRF-Token': this.token,
            'Content-Type': 'text/plain'
          }
        })

      this.moduleAttributeData.href = response.headers.location
      this.moduleAttributeData.download = file.name
      this.fileFeedback = null
      this.$forceUpdate()
    },
    manualAddFile (event) {
      event.preventDefault()

      const input = document.createElement('input')
      input.type = 'file'
      input.click()

      input.onchange = e => {
        const [file] = e.target.files
        this.uploadFile(file)
      }
    },
    dropAddFile (event) {
      const [file] = event.dataTransfer.files
      this.uploadFile(file)
    },
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
      })
    },
    setFileFeedback () {
      this.fileFeedback = 'Upload File'
    },
    removeFileFeedback () {
      this.fileFeedback = null
    }
  }
}
</script>
