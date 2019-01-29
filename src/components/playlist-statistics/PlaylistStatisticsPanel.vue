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
    background: linear-gradient(20deg, #041010, #010f35);
    border-radius: 5px;
    box-shadow: rgba(0,0,0, 0.65) 0 0 30px;

    position: fixed;
    z-index: var(--z-index-statistics-panel);
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

  @media screen and (max-width: 1080px) {
    .panel {
      background-color: var(--color-default);
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      box-shadow: none;

      width: 100%;
      max-width: none;
      margin: auto;

      position: static;
      transform: none;
      overflow-x: scroll;
      overflow-y: hidden;

      max-height: 0;
      transition: max-height 0.25s var(--ease-out-quart);

      &.show {
        max-width: none;
        max-height: 250px;
      }
    }

    .padding-box {
      width: 100%;
      padding: 30px 20px;
      display: flex;

      > * {
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
  }
</style>
