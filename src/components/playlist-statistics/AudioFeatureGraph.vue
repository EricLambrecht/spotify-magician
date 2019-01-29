<template>
  <div v-if="getAudioFeatureWithName(featureName).length > 0" class="section">
    <b-headline class="headline">
      {{ headline }}
    </b-headline>
    <la-cartesian
      :data="getAudioFeatureWithName(featureName)"
      :bound="[0,1]"
      :height="100"
      :width="width"
      :padding="0"
      class="chart"
    >
      <la-line
        :width="1.5"
        :animation-duration="1"
        prop="data"
        label="Energy"
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

export default {
  name: 'AudioFeatureGraph',
  components: {
    LaCartesian: Cartesian,
    LaLine: Line,
    LaTooltip: Tooltip,
    LaXAxis: XAxis,
  },
  props: {
    headline: {
      type: String,
      required: true,
    },
    featureName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('editor', [
      'getAudioFeatureWithName',
    ]),
    ...mapGetters('app', [
      'appWidth',
    ]),
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
  .section {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
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
