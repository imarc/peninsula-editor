<template>
    <section class="cms-prompt">
        <div class="cms-prompt-info">
            <h2 class="title">
                Upload Photo
            </h2>
            <section class="cms-attribute-fields">
                <image-uploader
                    :max-width="1920"
                    :quality="0.7"
                    output-format="string"
                    :capture="false"
                    accept="image/*"
                    do-not-resize="['gif', 'svg']"
                    class="cms-photo-thumbnail"
                    @input="setImage"
                />
                <transition name="fade-in">
                    <div v-if="isUploading" class="cms-loading-indicator">
                        <img src="/media/cms/icons/oval.svg" alt="" />
                    </div>
                </transition>
            </section>
            <button v-if="imageString" class="link" @click="savePhoto">
                Add Photo
            </button>
            <a href="#" class="cms-prompt-cancel" @click="cancel">
                Cancel
            </a>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'pinia'
import store from '../store/index'

export default {
  data () {
    return {
      imageString: null,
      isUploading: false
    }
  },
  computed: {
    ...mapState(store, ['photoSelection', 'token'])
  },
  methods: {
    setImage (file) {
      this.imageString = file
    },
    savePhoto () {
      this.isUploading = true

      axios
        .post('/api/v1/cms/files/', this.imageString, {
          headers: {
            'X-CSRF-Token': this.token,
            'Content-Type': 'text/plain'
          }
        })
        .then(response => {
          this.photoSelection.node.src = response.headers.location

          this.isUploading = false

          store.commit('setPhotoSelection', {
            isSelecting: false,
            node: null
          })
        })
    },
    cancel (event) {
      event.preventDefault()

      store.commit('setPhotoSelection', {
        isSelecting: false,
        node: null
      })
    }
  }
}
</script>
