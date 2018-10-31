<template>
  <div class="section">
    <b-headline>{{ headline }}</b-headline>
    <la-cartesian
      :data="getAudioFeatureWithName(featureName)"
      :bound="[0,1]"
      :height="100"
      :width="400"
      :padding="0"
      class="chart"
    >
      <la-line
        :width="1.5"
        :animation-duration="2"
        prop="data"
        label="Energy"
        color="#1DB954"
        animated
        curve
      />
      <la-x-axis prop="name" class="x-axis"/>
      <la-tooltip>
        <div slot="props">
          {props.label}
        </div>
      </la-tooltip>
    </la-cartesian>
    <div class="chart-bottom">
      <b-text class="start">Start</b-text>
      <b-text class="end">End</b-text>
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
  },
};
</script>

<style lang="scss" scoped>
  .section {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
  .chart {
    margin: 15px 1px 10px;
    border-left: 2px dashed var(--color-light-grey);
    border-right: 2px dashed var(--color-light-grey);
  }
  .chart-bottom {
    display: flex;
    font-size: 13px;
    color: #666;
  }
  .x-axis {
    display: none;
  }
  .end {
    margin-left: auto;
  }
</style>
