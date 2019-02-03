<template>
  <b-modal headline="Add track" :show="show">
    <track-search class="adder" @select="addTrack" />
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
    ...mapActions('editor', [
      'appendTrackToPlaylist',
    ]),
    addTrack(uri) {
      this.appendTrackToPlaylist(uri);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .adder {
    width: 600px;
    height: 290px;
  }

  @media screen and (max-width: 768px) {
    .adder {
      min-width: calc(100vw - 80px);
      width: calc(100vw - 80px);
      height:70vh;
    }
  }
</style>
