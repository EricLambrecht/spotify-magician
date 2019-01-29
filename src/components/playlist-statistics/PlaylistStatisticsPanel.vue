<template>
  <div :class="{ panel: true, show }">
    <div class="padding-box">
      <audio-feature-graph headline="Energy" feature-name="energy" />
      <audio-feature-graph headline="Positiveness" feature-name="valence" />
      <audio-feature-graph headline="Danceability" feature-name="danceability" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AudioFeatureGraph from './AudioFeatureGraph.vue';

export default {
  name: 'PlaylistStatisticsPanel',
  components: {
    AudioFeatureGraph,
  },
  computed: {
    ...mapState('editor', {
      show: state => state.playlistStatistics.show,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .panel {
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0,0,0, 0.25) 0 0 20px;

    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    max-height: 70vh;

    max-width: 0;
    overflow-x: hidden;
    overflow-y: scroll;

    transition: max-width 0.25s var(--ease-out-quart);

    > * {
      transition: opacity 0.25s var(--ease-out-quart);
    }

    &:not(.show) {
      > * {
        opacity: 0;
      }
    }
    &.show {
      max-width: 400px;
    }
  }

  .padding-box {
    padding: 20px;
  }
</style>
