<template>
  <b-modal headline="Add track">
    <track-search class="adder" @select="appendTrackToPlaylist" />
    <div slot="footer">
      <b-button @click="closeModal">
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';
import TrackSearch from '../TrackSearch.vue';

export default {
  name: 'AddTrackModal',
  components: { TrackSearch },
  methods: {
    ...mapActions('app', [
      'closeModal',
    ]),
    ...mapActions('editor', [
      'appendTrackToPlaylist',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .adder {
    width: 600px;
    height: 290px;
  }
</style>
