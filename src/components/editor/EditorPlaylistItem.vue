<template>
  <b-list-item
    class="playlist-item"
    tabindex="0"
    draggable="true"
    @blur.self="hideContextMenu"
  >
    <div class="image-container">
      <b-square-image :url="item.track.album.images[1].url" class="image" />
    </div>
    <b-text v-if="showTimeOfDay" class="time time-of-day">
      {{ item.track.relative_start_time_ms | formatTime('hh:mm') }}
    </b-text>
    <b-text v-else class="time duration">
      {{ item.track.duration_ms | formatTime('mm:ss') }}
    </b-text>
    <div class="artist-song-pair">
      <b-text class="song">
        {{ item.track.name }}
      </b-text>
      <b-text class="artist">
        {{ item.track.artists[0].name }}
      </b-text>
    </div>
    <b-text v-if="audioFeatures && showTempo" class="tempo">
      {{ audioFeatures.tempo.toFixed(2) }} BPM
    </b-text>
    <b-text class="mobile-drag-handle">
      <v-icon name="bars" />
    </b-text>
    <b-text class="track-menu" @click.native="toggleContextMenu">
      <v-icon name="ellipsis-h" />
    </b-text>
    <b-context-menu :show="showContextMenu" :actions="contextMenuActions" />
  </b-list-item>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import 'vue-awesome/icons/ellipsis-h'
import 'vue-awesome/icons/bars'
import formatTime from '../../utils/formatTime'

export default {
  name: 'EditorPlaylistItem',
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format)
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
    audioFeatures: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      showContextMenu: false,
    }
  },
  computed: {
    ...mapState('editor', {
      showTimeOfDay: state => state.displayOptions.showTimeOfDay,
      showTempo: state => state.displayOptions.showTempo,
    }),
    contextMenuActions() {
      return [
        {
          label: 'Remove from playlist',
          callback: () => this.removeTrack(this.item.track.uri),
        },
      ]
    },
  },
  methods: {
    ...mapActions('editor', ['removeTrack']),
    toggleContextMenu() {
      this.showContextMenu = !this.showContextMenu
    },
    hideContextMenu() {
      this.showContextMenu = false
    },
  },
}
</script>

<style lang="scss">
:root {
  --track-item-height: 51px;
  --track-item-spacing: 10px;
  --track-item-song-font-size: 13px;
  --track-item-song-line-height: 17px;
  --track-item-artist-font-size: 9px;
  --track-item-artist-line-height: 13px;
  --track-item-inner-margin: 20px;
}

@media screen and (max-width: 1112px) {
  :root {
    --track-item-height: 51px;
    --track-item-spacing: 10px;
    --track-item-song-font-size: 13px;
    --track-item-song-line-height: 17px;
    --track-item-artist-font-size: 9px;
    --track-item-artist-line-height: 13px;
    --track-item-inner-margin: 20px;
  }
}

@media screen and (max-width: 374px) {
  :root {
    --track-item-height: 40px;
    --track-item-spacing: 8px;
    --track-item-song-font-size: 12px;
    --track-item-song-line-height: 15px;
    --track-item-artist-font-size: 9px;
    --track-item-artist-line-height: 13px;
    --track-item-inner-margin: 14px;
  }
}
</style>

<style lang="scss" scoped>
.playlist-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--track-item-height);

  margin-top: var(--track-item-spacing);
  padding: 0 0 0 0;
  border-radius: 5px;

  background-color: var(--color-default-opposite);
  transition: background-color 0.1s ease;

  font-size: var(--track-item-song-font-size);
  position: relative;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
  }
}

.image-container {
  width: var(--track-item-height);
  min-width: var(--track-item-height);
  height: var(--track-item-height);
}

.image {
  min-width: var(--track-item-height);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.time {
  min-width: 34px;
  text-align: right;
  margin-left: var(--track-item-inner-margin);
}

.artist-song-pair {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: var(--track-item-inner-margin);

  .song {
    font-size: var(--track-item-song-font-size);
    line-height: var(--track-item-song-line-height);
    color: var(--color-default);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artist {
    font-size: var(--track-item-artist-font-size);
    line-height: var(--track-item-artist-line-height);
    color: var(--color-grey);
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.tempo {
  margin-left: auto;
  margin-right: var(--track-item-inner-margin);
  font-weight: 700;
  color: var(--color-grey);
  font-size: var(--font-size-default);
  flex-shrink: 0;
  padding: 10px 0 10px 10px;
}

.mobile-drag-handle {
  display: flex;
  margin-left: auto;
  margin-right: 10px;
  color: #eaeaea;
  visibility: hidden;
  pointer-events: none;

  @media screen and (max-width: 1112px) {
    // TODO: Show it as soon as touch dragging is supported
    /*visibility: visible; */
    /*pointer-events: all;*/
  }
}

.track-menu {
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 0;
  font-weight: bold;
  color: var(--color-grey);
  pointer-events: all;

  &:hover {
    background: var(--color-background-grey);
    color: var(--color-default-light);
    border-radius: 5px;
  }
}
</style>
