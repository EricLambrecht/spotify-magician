<template>
  <div class="main-window">
    <main-window-header />
    <editor-operation-panel />
    <error-message :error-message="errorMessage" />

    <modal-manager />
    <toast-message-system />

    <playlist-statistics-panel />

    <editor-playlist />
    <editor-track-adder />

    <main-window-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import EditorOperationPanel from '../editor/EditorOperationPanel'
import ErrorMessage from './ErrorMessage'
import MainWindowHeader from './MainWindowHeader'

import ModalManager from './ModalManager'
import ToastMessageSystem from './ToastMessageSystem'
import MainWindowFooter from './MainWindowFooter'
import EditorPlaylist from '../editor/EditorPlaylist'
import EditorTrackAdder from '../editor/EditorTrackAdder'
import PlaylistStatisticsPanel from '../playlist-statistics/PlaylistStatisticsPanel'

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
    }
  },
  computed: {
    ...mapState('editor', {
      errorMessage: state => state.error,
    }),
  },
}
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
