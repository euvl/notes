<template>
  <div class="sidebar">
    <div>
      <sidebar-header/>
    </div>
    <template v-if="!empty">
      <transition-group name="list" tag="div">
        <sidebar-item v-for="item in filtered"
                      :key="item.id"
                      :params="item"/>
      </transition-group>
    </template>
    <template v-else>
      <div class="sidebar-empty">
      No notes..
      </div>
    </template>
  </div>
</template>
<script>
import { mapState }  from 'vuex'
import SidebarHeader from './SidebarHeader'
import SidebarItem   from './SidebarItem'

export default {
  name: 'Sidebar',
  components: {
    SidebarHeader,
    SidebarItem
  },
  computed: {
    ...mapState([
      'notes',
      'selectedNoteId',
      'sidebarVisible',
      'sidebarSearch',
      'sidebarSorting'
    ]),
    empty () {
      return Object.keys(this.notes).length === 0
    },
    active () {
      return this.selectedNoteId === this.params.id
    },
    filtered () {
      if (this.sidebarSearch.length > 0) {
        return this.sorted.filter(v => {
          return v.title.indexOf(this.sidebarSearch) !== -1
        })
      }

      return this.sorted
    },
    sorted () {
      return this.notes.sort((a, b) => {
        var f1 = a[this.sidebarSorting]
        var f2 = b[this.sidebarSorting]

        if (f1 === f2) return 0

        return f1 > f2 ? -1 : 1
      })
    }
  }
}
</script>
<style lang="scss">
$border-color: #eee;

  .sidebar {
    position: fixed;
    width: 210px;
    height: 100vh;
    border-right: 1px solid $border-color;
    z-index: 20;
  }

  .sidebar-empty {
    padding: 20px;
    text-align: center;
    font-size: 12px;
    opacity: 0.3;
  }

  .add-note-button {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    font-size: 42px;
    line-height: 1;
  }
</style>
