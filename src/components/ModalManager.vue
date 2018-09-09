<template>
  <transition 
    :duration="300" 
    name="modal" 
    appear
  >
    <add-track-modal v-if="isOpen('add-track')"/>
    <select-playlist-modal v-if="isOpen('select-playlist') || !playlistExists"/>
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
      'playlistExists',
    ]),
    ...mapGetters('app', {
      isOpen: 'modalIsOpen',
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
