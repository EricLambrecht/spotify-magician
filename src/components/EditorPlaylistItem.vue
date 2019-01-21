<template>
  <b-list-item 
    class="playlist-item" 
    tabindex="0"
    draggable="true"
    @click.self="toggleContextMenu" 
    @blur.self="hideContextMenu"
  >
    <b-text v-if="showStartingTime" class="time">
      {{ item.track.relative_start_time_ms | formatTime('h:mm') }}
    </b-text>
    <b-text class="artist">
      {{ item.track.artists[0].name }}
    </b-text>
    <b-text class="song">
      {{ item.track.name }}
    </b-text>
    <b-text class="track-menu">
      ···
    </b-text>
    <b-text class="duration">
      {{ item.track.duration_ms | formatTime('mm:ss') }}
    </b-text>
    <b-context-menu :show="showContextMenu" :actions="contextMenuActions" />
  </b-list-item>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import formatTime from '../utils/formatTime';

export default {
  name: 'EditorPlaylistItem',
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format);
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showContextMenu: false,
    };
  },
  computed: {
    ...mapState('editor', {
      showStartingTime: state => state.displayOptions.showStartingTime,
    }),
    contextMenuActions() {
      return [
        {
          label: 'Remove from playlist',
          callback: () => this.removeTrack(this.item.track.uri),
        },
      ];
    },
  },
  methods: {
    ...mapActions('editor', [
      'removeTrack',
    ]),
    toggleContextMenu() {
      this.showContextMenu = !this.showContextMenu;
    },
    hideContextMenu() {
      this.showContextMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .playlist-item {
    display: flex;
    width: 100%;
    padding: 15px;
    position: relative;
    background-color: var(--color-track-item);
    left: -15px;

    margin-top: 6px;
    border-radius: 5px;

    transition: background-color .1s ease;

    &:focus {
      outline: none;
    }

    > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:not(:first-child) {
        margin-left: 20px;
      }
    }

    .artist {
      width: 200px;
    }

    .song {
      width: 200px;
    }

    .track-menu {
      width: 20px;
      margin-left: auto;
      opacity: 0;
      pointer-events: none;
      font-weight: bold;
    }

    &:hover {
      background-color:  white;
      box-shadow: 0 0 5px 0px rgba(0,0,0, 0.15);
      cursor: pointer;

      .track-menu {
        opacity: 0; /* TODO: enable */
        pointer-events: initial;
      }
    }
  }
</style>
