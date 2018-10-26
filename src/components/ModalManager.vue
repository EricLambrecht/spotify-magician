<template>
  <transition 
    :duration="300" 
    name="modal" 
    appear
  >
    <add-track-modal v-if="isOpen('add-track')"/>
    <select-playlist-modal v-if="isOpen('select-playlist') || !playlistExists"/>
    <changelog-modal v-if="isOpen('changelog-modal')"/>
    <confirmation-modal v-if="confirmationIsPending"/>
    <!-- add more modals here... -->
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddTrackModal from './modals/AddTrackModal.vue';
import SelectPlaylistModal from './modals/SelectPlaylistModal.vue';
import ChangelogModal from './modals/ChangelogModal.vue';
import ConfirmationModal from './modals/ConfirmationModal.vue';

export default {
  name: 'ModalManager',
  components: {
    ChangelogModal, SelectPlaylistModal, AddTrackModal, ConfirmationModal, 
  },
  computed: {
    ...mapGetters('editor', [
      'playlistImage',
      'playlistName',
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
