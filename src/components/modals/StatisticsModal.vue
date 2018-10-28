<template>
  <b-modal headline="Statistics">
    <div class="section">
      <b-headline>Energy</b-headline>
      <trend 
        :data="getAudioFeature('energy')"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      />
      <div class="chart-bottom">
        <b-text class="start">Start</b-text>
        <b-text class="end">End</b-text>
      </div>
    </div>

    <div class="section">
      <b-headline>Positiveness</b-headline>
      <trend 
        :data="getAudioFeature('valence')"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      />
      <div class="chart-bottom">
        <b-text class="start">Start</b-text>
        <b-text class="end">End</b-text>
      </div>
    </div>

    <div class="section">
      <b-headline>Danceability</b-headline>
      <trend
        :data="getAudioFeature('danceability')"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      />
      <div class="chart-bottom">
        <b-text class="start">Start</b-text>
        <b-text class="end">End</b-text>
      </div>
    </div>

    <div slot="footer">
      <b-button @click="closeModal">Close</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Trend from 'vuetrend';

export default {
  name: 'StatisticsModal',
  components: {
    Trend,
  },
  computed: {
    ...mapGetters('editor', [
      'playlistItems',
      'getAudioFeature',
    ]),
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
  .chart-bottom {
    display: flex;
  }
  .end {
    margin-left: auto;
  }
</style>
