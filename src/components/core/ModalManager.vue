<template>
  <div>
    <!-- TODO: This is not a scalable approach. We should include modals where they are needed. -->
    <add-track-modal v-if="isOpen('add-track')" />
    <select-playlist-modal v-if="isOpen('select-playlist') || !playlistExists" />
    <changelog-modal v-if="isOpen('changelog-modal')" />
    <confirmation-modal v-if="confirmationIsPending" />
    <statistics-modal v-if="isOpen('statistics-modal')" />
    <!-- add more modals here... -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddTrackModal from '../editor/AddTrackModal';
import SelectPlaylistModal from '../editor/SelectPlaylistModal';
import ChangelogModal from './ChangelogModal';
import ConfirmationModal from './ConfirmationModal';
import StatisticsModal from '../playlist-statistics/StatisticsModal';

export default {
  name: 'ModalManager',
  components: {
    ChangelogModal, SelectPlaylistModal, AddTrackModal, ConfirmationModal, StatisticsModal,
  },
  computed: {
    ...mapGetters('editor', [
      'playlistExists',
    ]),
    ...mapGetters('app', {
      isOpen: 'modalIsOpen',
      confirmationIsPending: 'confirmationIsPending',
    }),
  },
  methods: {
    ...mapActions('app', [
      'openModal',
      'closeModal',
    ]),
  },
};
</script>

<style scoped>

</style>
