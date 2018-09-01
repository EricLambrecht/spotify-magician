<template>
  <div class="main-window">
    <square-image :url="playlistImage" :size="140"/>
    <b-headline level="1">{{ playlistName }}</b-headline>

    <playlist-selector />

    <error-message :error-message="errorMessage"/>

    <div v-if="playlistData">
      <start-time-settings/>
      <playlist :track-items="playlistData.tracks.items"/>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex';

import Playlist from './Playlist.vue';
import PlaylistSelector from './PlaylistSelector.vue';
import SquareImage from './SquareImage.vue';
import ErrorMessage from './ErrorMessage.vue';
import StartTimeSettings from './StartTimeSettings.vue';

const { mapState } = createNamespacedHelpers('editor');

export default {
  name: 'MainWindow',
  components: {
    ErrorMessage,
    StartTimeSettings,
    SquareImage,
    Playlist,
    PlaylistSelector,
  },
  computed: {
    ...mapState({
      playlistData: state => state.playlist,
      startHour: state => state.startHour,
      startMinute: state => state.startMinute,
      errorMessage: state => state.errorMessage,
    }),
    ...mapGetters({
      playlistImage: 'editor/playlistImage',
      playlistName: 'editor/playlistName',
    }),
  },
};
</script>

<style scoped>

</style>
