<template>
  <div>
    <!-- Global modals without a "host" -->
    <select-playlist-modal />
    <confirmation-modal />

    <!-- dynamic modals live here... -->
    <portal-target name="modals" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelectPlaylistModal from '../editor/SelectPlaylistModal'
import ConfirmationModal from './ConfirmationModal'

export default {
  name: 'ModalManager',
  components: {
    SelectPlaylistModal,
    ConfirmationModal,
  },
  computed: {
    ...mapGetters('editor', ['playlistExists']),
    ...mapGetters('app', {
      isOpen: 'modalIsOpen',
      confirmationIsPending: 'confirmationIsPending',
    }),
  },
  methods: {
    ...mapActions('app', ['openModal', 'closeModal']),
  },
}
</script>

<style scoped></style>
