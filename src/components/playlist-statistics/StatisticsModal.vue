<template>
  <b-modal headline="Statistics" :show="show">
    <audio-feature-graph headline="Energy" feature-name="energy" />
    <audio-feature-graph headline="Positiveness" feature-name="valence" />
    <audio-feature-graph headline="Danceability" feature-name="danceability" />

    <div slot="footer">
      <b-button @click="$emit('close')">
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';
import AudioFeatureGraph from './AudioFeatureGraph';

export default {
  name: 'StatisticsModal',
  components: {
    AudioFeatureGraph,
  },
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
