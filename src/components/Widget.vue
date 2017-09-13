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
    ...mapState([
      'notes', 'sidebarVisible', 'config'
    ]),
    className () {
      let { sidebarVisible, config } = this
      let { fontSize, fontFamily, mode } = config

      return [
        'widget',
        `font-size-${fontSize}`,
        `font-family-${fontFamily}`,
        `mode-${mode}`,
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

.mode-day {

}

.mode-night {
  background: #F9F3E9;
  color: #5F3E2F;

  .CodeMirror, .editor .title {
    color: #5F3E2F;
  }

  .sidebar {
    border-color: #E9E0D6;

    .sidebar-item {
      border-color: #E9E0D6 !important;

      &.active {
        background: #F5EBDE;
      }

      .si-time {
        color: #5F3E2F;
        opacity: 0.5;
      }
    }
  }

  .text-editor-toolbar {
    background: #F9F3E9;
    color: #5F3E2F;
    border: 1px solid #F5EBDE;
    box-shadow: 0 5px 10px 2px rgba(#5F3E2F, .2);
  }
}

.widget {
  display: block;
  display: fixed;
  width: 100vw;
  height: 100vh;
  overflow: auto;

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
