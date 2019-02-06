<template>
  <div v-if="audioFeatureData.length > 0" class="section">
    <b-headline class="headline">
      {{ featureName | caption }}
    </b-headline>
    <la-cartesian
      :data="audioFeatureData"
      :bound="bounds"
      :height="100"
      :width="width"
      :padding="0"
      class="chart"
    >
      <la-line
        :width="1.5"
        :animation-duration="1"
        prop="data"
        :label="getCaptionForFeatureName(featureName)"
        color="#1DB954"
        animated
        curve
      />
      <la-x-axis prop="name" class="x-axis" />
      <la-tooltip>
        <div slot="props">
          {props.label}
        </div>
      </la-tooltip>
    </la-cartesian>
    <div class="chart-bottom">
      <b-text class="start">
        Start
      </b-text>
      <b-text class="end">
        End
      </b-text>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  Cartesian, Line, Tooltip, XAxis, 
} from 'laue';

import { getCaptionForFeatureName, getBoundsForLineChartFeature } from '../../store/playlist-statistics/supportedAudioFeatures';

export default {
  name: 'AudioFeatureGraph',
  components: {
    LaCartesian: Cartesian,
    LaLine: Line,
    LaTooltip: Tooltip,
    LaXAxis: XAxis,
  },
  filters: {
    caption(featureName) {
      return getCaptionForFeatureName(featureName);
    },
  },
  props: {
    featureName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('playlistStatistics', [
      'getAudioFeatureWithName',
    ]),
    ...mapGetters('app', [
      'appWidth',
    ]),
    audioFeatureData() {
      return this.getAudioFeatureWithName(this.featureName);
    },
    bounds() {
      return getBoundsForLineChartFeature(this.featureName);
    },
    width() {
      const padding = 40;
      const maxWidth = 300;
      const maximumAvailableSpace = this.appWidth - (2 * padding);
      return Math.min(maximumAvailableSpace, maxWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
  span.headline {
    color: #CCCCCC;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 15px;
  }
  .chart {
    margin: 15px 1px 10px;
    border-left: 2px dashed var(--color-default-light);
    border-right: 2px dashed var(--color-default-light);
  }
  .chart-bottom {
    display: flex;
    font-size: 13px;
    color: var(--color-grey);
  }
  .x-axis {
    display: none;
  }
  .end {
    margin-left: auto;
  }
</style>
