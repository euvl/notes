<template>
  <input class="title"
         type="text"
         :value="value"
         @input="input"
         placeholder="Title...">
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { transformText }        from '@/modules/transform'

export default {
  name: 'EditorTitle',
  data () {
    return {
      value: ''
    }
  },
  watch: {
    selectedNoteId: {
      handler (id) {
        this.value = id ? this.selected.title : ''
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['selected']),
    ...mapState(['selectedNoteId'])
  },
  methods: {
    input (event) {
      this.value = transformText(event.target.value)

      if (this.selected && this.selected.title !== this.value) {
        this.$store.commit('NOTE_SET_TITLE', {
          id: this.selectedNoteId,
          title: this.value || ''
        })
      }
    }
  }
}
</script>
