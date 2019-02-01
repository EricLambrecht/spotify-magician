<template>
  <b-modal headline="Add track" :show="show">
    <track-search class="adder" @select="appendTrackToPlaylist" />
    <div slot="footer">
      <b-button @click="$emit('close')">
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';
import TrackSearch from './TrackSearch';

export default {
  name: 'AddTrackModal',
  components: { TrackSearch },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
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
