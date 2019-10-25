<template>
  <b-list-item
    class="playlist-item"
    tabindex="0"
    draggable="true"
    @click.self="toggleContextMenu"
    @blur.self="hideContextMenu"
  >
    <b-square-image
      :url="item.track.album.images[1].url"
      :size="51"
      class="image"
    />
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
    <b-text class="track-menu">
      ···
    </b-text>
    <b-context-menu :show="showContextMenu" :actions="contextMenuActions" />
  </b-list-item>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  --track-item-song-font-size: 13px;
  --track-item-song-line-height: 17px;
  --track-item-artist-font-size: 9px;
  --track-item-artist-line-height: 13px;
}

@media screen and (max-width: 1080px) {
  :root {
    --track-item-height: 51px;
    --track-item-song-font-size: 13px;
    --track-item-song-line-height: 17px;
    --track-item-artist-font-size: 9px;
    --track-item-artist-line-height: 13px;
  }
}
</style>

<style lang="scss" scoped>
.playlist-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--track-item-height);

  margin-top: 10px;
  padding: 0 0 0 0;
  border-radius: 5px;

  background-color: var(--color-default-opposite);
  transition: background-color 0.1s ease;

  font-size: var(--track-item-song-font-size);

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    cursor: pointer;

    .track-menu {
      opacity: 0; /* TODO: enable */
      pointer-events: initial;
    }
  }

  > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
  }
}

.image {
  min-width: var(--track-item-height);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.time {
  min-width: 34px;
  text-align: right;
  margin-left: 20px;
}

.artist-song-pair {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 20px;

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
  margin-right: 20px;
  font-weight: 700;
  color: var(--color-grey);
  font-size: 14px;
  flex-shrink: 0;
  padding: 10px 0 10px 10px;
}

.track-menu {
  width: 20px;
  margin-left: 20px;
  display: none;
  pointer-events: none;
  font-weight: bold;
}
</style>
