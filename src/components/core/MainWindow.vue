<template>
  <div class="main-window">
    <main-window-header />
    <editor-operation-panel />
    <error-message :error-message="errorMessage" />

    <modal-manager />
    <toast-message-system />

    <editor-playlist />
    <editor-track-adder />

    <main-window-footer />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

import EditorPlaylist from '../editor/EditorPlaylist.vue';
import ErrorMessage from './ErrorMessage.vue';
import MainWindowHeader from './MainWindowHeader.vue';
import EditorOperationPanel from '../editor/EditorOperationPanel.vue';
import EditorTrackAdder from '../editor/EditorTrackAdder.vue';
import ModalManager from './ModalManager.vue';
import ToastMessageSystem from './ToastMessageSystem.vue';
import MainWindowFooter from './MainWindowFooter.vue';

export default {
  name: 'MainWindow',
  components: {
    MainWindowFooter,
    ToastMessageSystem,
    ModalManager,
    EditorTrackAdder,
    EditorOperationPanel,
    EditorPlaylist,
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
  }
</style>
