<template>
    <div class="cms-editorHighlight" :style="styleString"></div>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      ticking: false
    }
  },

  computed: {
    styleString () {
      return `transform: translate(${this.left}px, ${this.top}px); width: ${this.width}px; height: ${this.height}px`
    }
  },

  created () {
    window.addEventListener('resize', this.setContext)

    setTimeout(() => {
      this.setContext()
    }, 250)
  },

  methods: {
    setContext () {
      if (this.node && !this.ticking) {
        const rect = this.node.node.getBoundingClientRect()
        const left = window.pageXOffset || document.documentElement.scrollLeft
        const top = window.pageYOffset || document.documentElement.scrollTop
        const offset = window.innerWidth > 1560 ? 160 : 320

        requestAnimationFrame(() => {
          this.top = rect.top + top
          this.left = rect.left + left - offset
          this.width = rect.width
          this.height = rect.height

          this.ticking = false
        })

        this.ticking = true
      }
    }
  }
}
</script>
