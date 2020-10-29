<template>
    <section class="cms-prompt">
        <div class="cms-prompt-info">
            <h2 class="title">
                Update Settings for this Module
            </h2>
            <section class="cms-attribute-fields">
                <div class="text">
                    <label for="name">Enter a unique name for this module</label>
                    <input id="name" v-model="moduleAttributeData.name" type="text" />
                </div>
                <span
                    v-for="(value, key) in availibleModules[currentModuleType].attributes"
                    :key="key"
                >
                    <div
                        v-if="
                            isArray(value.options) &&
                                typeof moduleAttributeData[key] !== 'undefined'
                        "
                        class="select"
                    >
                        <label for="cardReference">Pick a custom style</label>
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
                    <div
                        v-else-if="typeof moduleAttributeData[key] !== 'undefined'"
                        class="text"
                    >
                        <div
                          v-if="key === 'href'"
                          @drop.prevent="dropAddFile"
                          @dragover.prevent="setFileFeedback"
                          @dragleave="removeFileFeedback"
                          class="file-upload"
                        >
                          <label :for="key" v-text="value.label"></label>
                          <p
                              v-if="baseModuleData.attributes[key].note"
                              class="note -info"
                          >
                            <span v-text="baseModuleData.attributes[key].note"></span> <a href="#" @click="manualAddFile">Or click here to upload.</a>
                          </p>
                          <input :id="key" v-model="moduleAttributeData[key]" type="text" />
                          <transition name="fade-in">
                            <div class="file-feedback" v-if="fileFeedback">
                              <p class="message" v-text="fileFeedback"></p>
                            </div>
                          </transition>
                        </div>
                        <div v-else-if="key === 'download' && moduleAttributeData.download.length">
                          <label :for="key" v-text="value.label"></label>
                          <p
                              v-if="baseModuleData.attributes[key].note"
                              class="note -info"
                              v-text="baseModuleData.attributes[key].note"
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
                              v-if="baseModuleData.attributes[key].note"
                              class="note -info"
                              v-text="baseModuleData.attributes[key].note"
                          ></p>
                          <input :id="key" v-model="moduleAttributeData[key]" type="text" />
                        </div>
                    </div>
                </span>
                <span v-if="typeof availibleModules[currentModuleType].parameters !== 'undefined'">
                  <span v-for="(value, key) in availibleModules[currentModuleType].parameters" :key="key">
                      <div v-if="isArray(value.options)" class="select">
                          <label for="cardReference" v-text="value.label"></label>
                          <p
                              v-if="baseModuleData.parameters[key].note"
                              class="note -info"
                              v-text="baseModuleData.parameters[key].note"
                          ></p>
                          <span>
                              <select
                                  :id="moduleParameterData[key]"
                                  v-model="moduleParameterData[key]"
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
                      <div v-if="isObject(value.options)" class="select">
                          <label for="cardReference" v-text="value.label"></label>
                          <p
                              v-if="baseModuleData.parameters[key].note"
                              class="note -info"
                              v-text="baseModuleData.parameters[key].note"
                          ></p>
                          <span>
                              <select
                                  :id="moduleParameterData[key]"
                                  v-model="moduleParameterData[key]"
                                  name="cardReference"
                              >
                                  <option
                                      v-for="(parameterOption, parameterKey) in value.options"
                                      :key="parameterKey"
                                      :value="parameterKey"
                                      v-text="parameterOption"
                                  ></option>
                              </select>
                          </span>
                      </div>
                  </span>
                </span>
            </section>
            <button class="link" @click="updateModuleAttributes">
                Update Module
            </button>
            <a href="#" class="cms-prompt-cancel" @click="closeSettings">
                Cancel
            </a>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import { startCase, isArray, isObject } from 'lodash'
import axios from 'axios'
import attributeGetters from '../store/modules/_attributeGetters'
import attributeHandlers from '../store/modules/_attributeHandlers'
import { getParameters, renderData } from '../modules/renderData'

import store from '../store/index'

export default {
  data () {
    return {
      moduleAttributeData: {
        name: null
      },
      moduleParameterData: {},
      customClass: null,
      initialClass: null,
      classNode: null,
      fileFeedback: null
    }
  },
  computed: {
    ...mapState(['currentModule', 'availibleModules', 'token']),
    currentModuleType () {
      return this.currentModule.node.dataset.module
    },
    baseModuleData () {
      return this.availibleModules[this.currentModuleType]
    }
  },
  mounted () {
    this.moduleAttributeData.name = this.currentModule.node.dataset.moduleName

    const moduleAttributes = this.availibleModules[this.currentModuleType].attributes

    Object.keys(moduleAttributes).forEach(key => {
      const handler =
                typeof moduleAttributes[key].handler !== 'undefined'
                  ? moduleAttributes[key].handler
                  : 'default'
      try {
        this.moduleAttributeData[key] = attributeGetters[handler](
          this.currentModule.node,
          moduleAttributes[key],
          key
        )
      } catch (error) {
        store.dispatch('throwError', `${error}`)
      }
    })

    const parameterObj = getParameters(this.currentModule.node.dataset)
    Object.keys(parameterObj).forEach(key => {
      this.moduleParameterData[key] = parameterObj[key]
    })
  },
  methods: {
    applyStartCase (string) {
      return startCase(string)
    },
    updateModuleAttributes () {
      this.currentModule.node.dataset.moduleName = this.moduleAttributeData.name

      const moduleAttributes = this.availibleModules[this.currentModuleType]
        .attributes
      const errors = []

      /**
       * Look for additional attributes besides name and apply them
       */
      Object.keys(moduleAttributes).forEach(key => {
        const moduleConfig = moduleAttributes[key]

        const handler =
                    typeof moduleConfig.handler !== 'undefined'
                      ? moduleConfig.handler
                      : 'default'

        try {
          /**
           * Check if unique handler has been defined.
           */
          attributeHandlers[handler](
            this.currentModule.node,
            this.availibleModules[this.currentModuleType],
            this.moduleAttributeData[key],
            key
          )
        } catch (error) {
          store.dispatch('throwError', error)
          errors.push(error)
        }
      })

      if (errors.length > 0) {
        return false
      }

      Object.keys(this.moduleParameterData).forEach(key => {
        this.currentModule.node.setAttribute(`data-parameter-${key}`, this.moduleParameterData[key])
      })

      renderData(this.currentModule.node)

      store.dispatch('setIsEditing', true)
      store.dispatch('closeModuleSettings')
      store.dispatch('resetListContext')

      return true
    },
    closeSettings (event) {
      event.preventDefault()
      store.dispatch('closeModuleSettings')
    },
    isArray (value) {
      return isArray(value)
    },
    isObject (value) {
      return isObject(value)
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
