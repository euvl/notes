<template>
  <div :class="className">
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
    ...mapState(['notes', 'sidebarVisible', 'config']),
    className () {
      let { sidebarVisible, config } = this

      return [
        'widget',
        'font-size-' + config.fontSize,
        'font-family-' + config.fontFamily.toLowerCase(),
        { 'sidebar-is-visible': sidebarVisible }
      ]
    }
  }
}
</script>
<style lang="scss">
$font-sizes: 13px, 16px, 20px;

@each $font-size in $font-sizes {
  $index: index($font-sizes, $font-size) - 1;

  .font-size-#{$index} {
    .CodeMirror {
      font-size: $font-size !important;
    }
  }
}

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
