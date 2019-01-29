<template>
  <div class="main-window">
    <main-window-header />
    <editor-operation-panel />
    <error-message :error-message="errorMessage" />

    <modal-manager />
    <toast-message-system />

    <editor-playlist />
    <editor-track-adder />

    <playlist-statistics-panel />

    <main-window-footer />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

import EditorOperationPanel from '../editor/EditorOperationPanel.vue';
import ErrorMessage from './ErrorMessage.vue';
import MainWindowHeader from './MainWindowHeader.vue';

import ModalManager from './ModalManager.vue';
import ToastMessageSystem from './ToastMessageSystem.vue';
import MainWindowFooter from './MainWindowFooter.vue';
import EditorPlaylist from '../editor/EditorPlaylist.vue';
import EditorTrackAdder from '../editor/EditorTrackAdder.vue';
import PlaylistStatisticsPanel from '../playlist-statistics/PlaylistStatisticsPanel.vue';


export default {
  name: 'MainWindow',
  components: {
    PlaylistStatisticsPanel,
    EditorTrackAdder,
    EditorPlaylist,
    MainWindowFooter,
    ToastMessageSystem,
    ModalManager,
    EditorOperationPanel,
    ErrorMessage,
    MainWindowHeader,
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
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-grey);
    font-family: var(--font-family);
  }
</style>
