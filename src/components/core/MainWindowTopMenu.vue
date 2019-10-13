<template>
  <div v-if="playlistExists" class="menu">
    <b-container class="container">
      <b-button-group class="button-group">
        <b-button
          class="menu-item open-button"
          tertiary
          small
          @click="openModal('select-playlist')"
        >
          Open
        </b-button>
        <b-button class="menu-item" primary disabled small>
          New
        </b-button>
      </b-button-group>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('editor', ['playlistExists']),
  },
  methods: {
    ...mapActions('app', ['openModal']),
  },
}
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  justify-content: flex-end;
}
.menu {
  position: absolute;
  top: 20px;
  right: 0;
  left: 0;
}
@media screen and (max-width: 768px) {
  .container {
    justify-content: flex-start;
  }

  .menu-item {
    width: 100%;
    &:first-child {
      background-color: #e0e0e0 !important;
    }
  }
}
</style>
