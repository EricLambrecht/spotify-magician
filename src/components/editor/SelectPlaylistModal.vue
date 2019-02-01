<template>
  <b-modal headline="Choose a playlist" :show="isOpen('select-playlist') || !playlistExists">
    <playlist-selector @select="closeModal" />
    <div v-if="playlistExists" slot="footer">
      <b-button @click="closeModal">
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PlaylistSelector from './PlaylistSelector';

export default {
  name: 'PlaylistSelectorModal',
  components: { PlaylistSelector },
  computed: {
    ...mapGetters('editor', [
      'playlistExists',
    ]),
    ...mapGetters('app', {
      isOpen: 'modalIsOpen',
    }),
  },
  methods: {
    ...mapActions('editor', [
      'appendTrackToPlaylist',
    ]),
    ...mapActions('app', [
      'closeModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>

</style>
