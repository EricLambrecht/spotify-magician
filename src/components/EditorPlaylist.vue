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
        :item="item"
        :position="index+1"
        :key="item.track.id"
        draggable="true"
        @dragstart.native="onDragStart(index)"
        @dragend.native="onDragEnd(index)"
        @dragenter.native="onDragEnter(index)"
      />
    </template>
  </b-list>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import EditorPlaylistItem from './EditorPlaylistItem.vue';
import formatTime from '../utils/formatTime';

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
    onDragStart(index) {
      this.dragging = true;
      this.draggedFrom = index;
      this.draggedTo = null;
      this.draggedFromOriginally = index;
      this.temporaryPlaylistItems = [...this.playlistItems];
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
      this.temporaryPlaylistItems = null; 
      // TODO: Keep temp items, but only show them when "dragging = true"
    },
    moveElement(from, to) {
      this.temporaryPlaylistItems.splice(
        to, 
        0, 
        this.temporaryPlaylistItems.splice(from, 1)[0],
      );
    },
  },
};
</script>

<style lang="scss">
  .playlist {
    max-width: 1000px;
    margin: 20px auto;

    .section-headline {
      margin-top: 20px;
      margin-bottom: 12px;
      font-weight: bold;
    }
  }
</style>
