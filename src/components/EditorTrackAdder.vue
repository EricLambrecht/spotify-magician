<template>
  <b-container>
    <track-search class="editor-track-adder" @select="appendTrackToPlaylist"/>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';
import TrackSearch from './TrackSearch.vue';

export default {
  name: 'EditorTrackAdder',
  components: { TrackSearch },
  methods: {
    ...mapActions('editor', [
      'appendTrackToPlaylist',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .editor-track-adder {
    margin-top: 20px;
  }
</style>
