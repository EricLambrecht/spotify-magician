<template>
  <div class="main-window">
    <main-window-header/>
    <editor-operation-panel/>
    <error-message :error-message="errorMessage"/>

    <modal-manager/>
    <toast-message-system/>

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
import ToastMessageSystem from './ToastMessageSystem.vue';

export default {
  name: 'MainWindow',
  components: {
    ToastMessageSystem,
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
    ...mapGetters('app', {
      isOpen: 'modalIsOpen',
    }),
    ...mapGetters('editor', [
      'playlistImage',
      'playlistName',
      'playlistExists',
    ]),
  },
  methods: {
    ...mapActions('app', [
      'openModal',
      'addToast',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .main-window {

  }
</style>
