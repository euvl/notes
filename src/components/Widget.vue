<template>
  <div :class="['widget', sidebarVisible && 'sidebar-is-visible']">
    <sidebar v-if="sidebarVisible" />
    <div class="editor-wrapper">
      <editor />
    </div>
  </div>
</template>
<script>
import Sidebar    from './Sidebar.vue'
import Editor     from './Editor.vue'
import session    from '@/modules/session'
import {mapState} from 'vuex'

export default {
  name: '',
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
  mounted () {
    if (this.notes.length > 0) {
      this.$store.commit('SET_SELECTED_NOTE', this.notes[0].id)
    }
  },
  computed: {
    ...mapState(['notes', 'sidebarVisible']) // ,
    // editorWrapperStyle () {
    //   return {
    //     'padding-left': this.sidebarVisible ? '210px' : '0'
    //   }
    // }
  }
}
</script>
<style lang="scss">
.widget {
  display: block;
  //overflow: hidden;

  .editor-wrapper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    // transition: all 0.3s;
    // z-index: 3;
    // padding-left: 210px;
  }


  &.sidebar-is-visible {
    .editor-wrapper {
      padding-left: 210px;
  //    margin-left: 0;

  //    @media only screen and (max-width : 736px) {
  //      padding-left: 0;
  //      margin-left: 210px;
  //      background: yellow;
  //    }
    }

  }

  .editor {
    box-sizing: border-box;
  }
}
</style>
