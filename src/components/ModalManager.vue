<template>
  <transition :duration="300" name="modal">
    <add-track-modal v-if="isOpen('add-track')"/>
    <select-playlist-modal v-if="isOpen('select-playlist')"/>
    <!-- add more modals here... -->
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddTrackModal from './modals/AddTrackModal.vue';
import SelectPlaylistModal from './modals/SelectPlaylistModal.vue';

export default {
  name: 'ModalManager',
  components: { SelectPlaylistModal, AddTrackModal },
  computed: {
    ...mapGetters('editor', [
      'playlistImage',
      'playlistName',
      'isOpen',
    ]),
  },
  methods: {
    ...mapActions('editor', [
      'openModal',
      'closeModal',
    ]),
  },
};
</script>

<style scoped>

</style>
