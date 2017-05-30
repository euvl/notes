<template>
  <div class="sidebar-item" :class="{active}" @click="select">
    <div class="si-title">{{title}}</div>
    <div class="si-description">{{text}}</div>
    <div class="si-time">
      <i v-if="params.isStarred" class="ion-ios-star" style="color: #FFDD67;"></i>
      <span>{{modifiedAt}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import moment       from 'moment'

export default {
  name: 'SidebarItem',
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['notes', 'selectedNoteId']),
    active () {
      return this.selectedNoteId === this.params.id
    },
    title () {
      return (this.params.title || '...').substr(0, 60)
    },
    text () {
      return (this.params.text || '...').substr(0, 100)
    },
    modifiedAt () {
      return moment(this.params.modifiedAt).fromNow()
    }
  },
  methods: {
    select (event) {
      this.$store.commit('SET_SELECTED_NOTE', this.params.id)
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #eee;
$background-selected-color: #f6f6f6;
$date-color: #C2C7CC;

  .sidebar-item {
    position: relative;

    width: 210px;
    box-sizing: border-box;
    padding: 10px 5px;
    padding-top: 15px;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid $border-color;

    &:first-child {
      border-top: 1px solid transparent;
    }

    &.active {
      background: $background-selected-color;

      &:first-child {
        border-top: 1px solid $border-color;
      }
    }

    div {
      box-sizing: border-box;
    }

    .si-title {
      padding: 5px;
      padding-top: 6px;
      padding-bottom: 0;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Cardo', Helvetica, Arial, serif;
    }

    .si-description {
      padding-left: 5px;
      font-size: 11px;
      opacity: 0.5;
    }

    .si-title, .si-description {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .si-time {
      top: 0;
      right: 0;
      color: $date-color;
      padding: 5px;
      padding-bottom: 0;
      padding-left: 0;
      position: absolute;
      font-size: 10px;
      text-align: right;
    }
  }
</style>
