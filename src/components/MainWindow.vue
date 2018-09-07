<template>
  <div class="main-window">
    <main-window-header/>
    <editor-operation-panel/>
    <error-message :error-message="errorMessage"/>
    <modal-manager/>
    <editor-playlist/>
    <editor-track-adder/>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

import EditorPlaylist from './EditorPlaylist.vue';
import ErrorMessage from './ErrorMessage.vue';
import StartTimeSettings from './StartTimeSettings.vue';
import MainWindowHeader from './MainWindowHeader.vue';
import EditorOperationPanel from './EditorOperationPanel.vue';
import EditorTrackAdder from './EditorTrackAdder.vue';
import ModalManager from './ModalManager.vue';

export default {
  name: 'MainWindow',
  components: {
    ModalManager,
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
    ...mapGetters('editor', [
      'playlistImage',
      'playlistName',
      'playlistExists',
      'isOpen',
    ]),
  },
  mounted() {
    if (!this.playlistExists) {
      this.openModal('select-playlist');
    }
  },
  methods: {
    ...mapActions('editor', [
      'openModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .main-window {

  }
</style>
