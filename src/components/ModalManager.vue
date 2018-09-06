<template>
  <transition :duration="300" name="modal">
    <add-track-modal v-if="isOpen('add-track')"/>
    <!-- add more modals here... -->
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddTrackModal from './modals/AddTrackModal.vue';

export default {
  name: 'ModalManager',
  components: { AddTrackModal },
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
