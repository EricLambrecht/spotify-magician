<template>
  <div :class="{ panel: true, show }">
    <div class="padding-box">
      <graph-feature-chooser class="buttons" />
      <!-- map over user selected features -->
      <div class="graphs">
        <audio-feature-graph
          v-for="feature in activeFeatureGraphs"
          :key="feature"
          :headline="feature"
          :feature-name="feature"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AudioFeatureGraph from './AudioFeatureGraph';
import GraphFeatureChooser from './GraphFeatureChooser';

export default {
  name: 'PlaylistStatisticsPanel',
  components: {
    GraphFeatureChooser,
    AudioFeatureGraph,
  },
  computed: {
    ...mapState('playlistStatistics', {
      show: state => state.show,
      activeFeatureGraphs: state => state.activeFeatureGraphs,
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

    max-width: 0;

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

  .buttons {
    margin-bottom: 20px;
    min-width: 380px;
    max-height: 102px;
    overflow-y: hidden;
  }

  .graphs {
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 61vh;

    padding-left: 20px;
    padding-right: 37px;

    > * {
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }

  .padding-box {
    height: 100%;
    max-width: 100%;
    padding: 20px 0 20px 20px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 1080px) {
    .panel {
      background-color: var(--color-default);
      border-radius: 0 0 10px 10px;
      box-shadow: rgba(0,0,0, 0.45) 0 3px 8px;

      width: 100%;
      max-width: none;
      margin: auto;
      max-height: 0;

      position: static;
      transform: none;

      transition: max-height 0.25s var(--ease-out-quart);

      &.show {
        max-width: none;
        max-height: 250px;
      }
    }

    .graphs {
      overflow-x: scroll;
      overflow-y: hidden;
      max-height: none;

      display: flex;
      padding: 0;

      > * {
        &:not(:last-child) {
          margin-bottom: 0;
          margin-right: 40px;
        }
      }
    }

    .buttons {
      min-width: 240px;
      max-width: 270px;
      max-height: none;
      margin-bottom: 0;
    }

    .padding-box {
      width: 100%;
      padding: 30px 20px;
      display: flex;
    }
  }
</style>
