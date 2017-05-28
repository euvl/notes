<template>
  <div :class="['widget', sidebarVisible && 'sidebar-is-visible']">
    <sidebar v-if="sidebarVisible" />
    <div class="editor-wrapper">
      <editor />
    </div>
  </div>
</template>
<script>
import Sidebar      from './Sidebar.vue'
import Editor       from './Editor.vue'
import session      from '@/modules/session'
import { mapState } from 'vuex'

export default {
  name: 'Widget',
  components: {
    Sidebar,
    Editor
  },
  watch: {
    notes: {
      handler: function (notes) {
        session.update(notes)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['notes', 'sidebarVisible'])
  }
}
</script>
<style lang="scss">
.widget {
  display: block;

  .editor-wrapper {
    width: 100%;
    box-sizing: border-box;
  }

  &.sidebar-is-visible {
    .editor-wrapper {
      padding-left: 210px;
    }
  }

  .editor {
    box-sizing: border-box;
  }
}
</style>
