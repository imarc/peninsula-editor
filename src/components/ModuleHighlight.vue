<template>
    <div class="cms-moduleHighlight" :style="styleString"></div>
</template>

<script>
import { mapState } from 'pinia'
import store from '../store/index.js'

export default {
  data () {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }
  },

  computed: {
    ...mapState(store, ['highlightedNode']),
    styleString () {
      return `top: ${this.top}px; left: ${this.left}px; width: ${this.width}px; height: ${this.height}px`
    }
  },

  created () {
    window.addEventListener('scroll', this.setContext)
    this.setContext()
  },

  destroyed () {
    window.removeEventListener('scroll', this.setContext)
  },

  methods: {
    setContext () {
      if (this.highlightedNode) {
        const {
          top,
          left,
          width,
          height
        } = this.highlightedNode.getBoundingClientRect()

        this.top = top
        this.left = left
        this.width = width
        this.height = height

        this.$forceUpdate()
      }
    }
  }
}
</script>
