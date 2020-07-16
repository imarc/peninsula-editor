<template>
    <div class="cms-editorHighlights">
        <div v-for="editor in idEditors" :key="editor.id">
            <HighlightBox
                v-if="editor.node !== editingNode"
                :node="{ node: editor.node }"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import uuidv4 from 'uuid/v4'
import HighlightBox from './HighlightBox.vue'

export default {
  components: {
    HighlightBox
  },

  computed: {
    ...mapState(['editors', 'editingNode']),

    idEditors () {
      return this.editors.map(editor => {
        return {
          id: uuidv4(),
          node: editor
        }
      })
    }
  }
}
</script>
