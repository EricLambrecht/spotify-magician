<template>
  <b-list class="playlist" ordered>
    <template v-for="(item, index) in displayItems">
      <b-list-item
        v-if="index === 0 || item.track.first_of_hour"
        v-show="showStartingTime"
        :key="item.track.relative_start_time_ms"
        class="section-headline"
      >
        {{ item.track.relative_start_time_ms | formatTime('h:mm') }} Uhr
      </b-list-item>
      <editor-playlist-item
        :key="item._uniqueId"
        :item="item"
        :position="index+1"
        :class="{
          'drag-hover': draggedTo === index,
          'drag-origin': index === draggedFromOriginally
        }"
        draggable="true"
        @dragstart.native="(e) => onDragStart(index, e)"
        @dragend.native="onDragEnd(index)"
        @dragenter.native="onDragEnter(index)"
      />
    </template>
  </b-list>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import EditorPlaylistItem from './EditorPlaylistItem.vue';
import formatTime from '../../utils/formatTime';

export default {
  name: 'EditorPlaylist',
  components: { EditorPlaylistItem },
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format);
    },
  },
  data() {
    return {
      temporaryPlaylistItems: null,
      dragging: false,
      draggedFrom: null,
      draggedFromOriginally: null,
      draggedTo: null,
    };
  },
  computed: {
    ...mapState('editor', {
      showStartingTime: state => state.displayOptions.showStartingTime,
    }),
    ...mapGetters({
      playlistItems: 'editor/playlistItems',
    }),
    displayItems() {
      // Return the temporary items if they exists, otherwise the "real" ones
      return this.temporaryPlaylistItems || this.playlistItems;
    },
  },
  methods: {
    ...mapActions('editor', [
      'reorderTracks',
    ]),
    onDragStart(index, event) {
      this.dragging = true;
      this.draggedFrom = index;
      this.draggedTo = null;
      this.draggedFromOriginally = index;
      this.temporaryPlaylistItems = [...this.playlistItems];
      event.dataTransfer.setData('text/plain', 'This is dummy data to fix a firefox bug');
    },
    onDragEnter(index) {
      if (this.draggedTo !== index) {
        this.draggedTo = index;
        this.moveElement(this.draggedFrom, this.draggedTo);
        this.draggedFrom = this.draggedTo;
      }
    },
    async onDragEnd() {
      // Dispatch actual reordering action
      const insertBefore = this.draggedFromOriginally < this.draggedTo
        ? this.draggedTo + 1
        : this.draggedTo;

      await this.reorderTracks({
        rangeStart: this.draggedFromOriginally,
        insertBefore,
      });

      // cleanup
      this.dragging = false;
      this.draggedFrom = null;
      this.draggedTo = null;
      this.draggedFromOriginally = null;
      this.temporaryPlaylistItems = null;
    },
    moveElement(from, to) {
      this.temporaryPlaylistItems.splice(
        to, 
        0, 
        this.temporaryPlaylistItems.splice(from, 1)[0],
      );
    },
    createUniqueId() {
      return Math.random().toString(36).substr(2, 9);
    },
  },
};
</script>

<style lang="scss">
  .playlist {
    width: calc(100% - (2 * var(--grid-padding)));
    max-width: var(--grid-max-width);
    margin: 20px auto;

    /* This really solves an issue with drag and drop rendering in chrome */
    transform: translateZ(0);

    .section-headline {
      margin-top: 20px;
      margin-bottom: 12px;
      font-weight: bold;
      padding: 0;
    }

    .drag-hover {
      background-color: white;
      box-shadow: 0 0 5px 0px var(--spotify-green);
    }
    .drag-origin:hover {
      background-color: var(--color-track-item);
    }
    .drag-hover.drag-origin:hover {
      background-color: white;
      box-shadow: 0 0 5px 0px var(--spotify-green);
    }
  }
</style>
