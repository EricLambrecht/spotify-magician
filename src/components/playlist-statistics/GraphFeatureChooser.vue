<template>
  <div class="checkbox-button-group">
    <b-checkbox-button
      v-for="feature in availableFeatures"
      :key="feature"
      :label="getCaptionForFeatureName(feature)"
      :checked="activeFeatureGraphs.includes(feature)"
      @turnedOn="activateFeatureGraph(feature)"
      @turnedOff="deactivateFeatureGraph(feature)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { lineChartFeatures, getCaptionForFeatureName } from '../../store/playlist-statistics/supportedAudioFeatures';

export default {
  name: 'GraphFeatureChooser',
  data() {
    return {
      availableFeatures: [...lineChartFeatures],
    };
  },
  computed: {
    ...mapState('playlistStatistics', {
      activeFeatureGraphs: state => state.activeFeatureGraphs,
    }),
  },
  methods: {
    ...mapActions('playlistStatistics', [
      'activateFeatureGraph',
      'deactivateFeatureGraph',
    ]),
    getCaptionForFeatureName,
  },
};
</script>

<style lang="scss" scoped>
  .checkbox-button-group {
    margin-bottom: 10px;

    > * {
      margin-bottom: 6px;
      margin-right: 6px;
    }
  }
</style>
