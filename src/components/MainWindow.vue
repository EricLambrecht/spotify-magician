<template>
  <div class="main-window">
    <main-window-header/>
    <editor-operation-panel/>
    <error-message :error-message="errorMessage"/>
    <editor-playlist/>
    <editor-track-adder/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import EditorPlaylist from './EditorPlaylist.vue';
import ErrorMessage from './ErrorMessage.vue';
import StartTimeSettings from './StartTimeSettings.vue';
import MainWindowHeader from './MainWindowHeader.vue';
import EditorOperationPanel from './EditorOperationPanel.vue';
import EditorTrackAdder from './EditorTrackAdder.vue';

export default {
  name: 'MainWindow',
  components: {
    EditorTrackAdder,
    EditorOperationPanel,
    EditorPlaylist,
    ErrorMessage,
    MainWindowHeader,
    StartTimeSettings,
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    ...mapState('editor', {
      errorMessage: state => state.error,
    }),
    ...mapGetters({
      playlistImage: 'editor/playlistImage',
      playlistName: 'editor/playlistName',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .main-window {
    /* This really solves an issue with drag and drop rendering in chrome */
    transform: translateZ(0);
  }
</style>
