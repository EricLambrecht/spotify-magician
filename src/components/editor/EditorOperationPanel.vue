<template>
  <div class="operation-panel">
    <b-grid>
      <b-row>
        <b-column>
          <start-time-settings />
        </b-column>
        <b-column class="right">
          <b-button tertiary @click="onClickStatistics">
            <chart-icon class="icon" />
          </b-button>
          <b-button tertiary @click="onClickShuffle">
            <shuffle-icon class="icon" />
          </b-button>
        </b-column>
      </b-row>
    </b-grid>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Shuffle, BarChart } from 'vue-feather-icon';
import StartTimeSettings from './StartTimeSettings.vue';
import shuffle from '../../editor-operations/shuffle';

export default {
  name: 'EditorOperationPanel',
  components: {
    StartTimeSettings,
    ShuffleIcon: Shuffle.default,
    ChartIcon: BarChart.default,
  },
  methods: {
    async onClickShuffle() {
      try {
        await this.askForConfirmation({
          headline: 'Shuffle',
          question: 'Are you sure you want to shuffle your playlist?',
          positive: 'Shuffle',
          negative: 'Cancel',
        });
        await this.rearrangePlaylistWith(shuffle);
      } catch (e) {
        this.addToast({
          message: e.message,
          type: 'error',
          dismissible: false,
        });
      }
    },
    async onClickStatistics() {
      try {
        await this.fetchPlaylistAudioFeatures();
        this.openModal('statistics-modal');
      } catch (e) {
        this.addToast({
          message: e.message,
          type: 'error',
          dismissible: false,
        });
      }
    },
    ...mapActions('app', [
      'askForConfirmation',
      'addToast',
      'openModal',
    ]),
    ...mapActions('editor', [
      'rearrangePlaylistWith',
      'fetchPlaylistAudioFeatures',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .operation-panel {
    padding: 12px 0;
    box-shadow: 0 2px 2px 0px rgba(0,0,0,0.1);
    background-color: var(--color-light-grey);
  }

  .icon, .icon > * {
    color: green;
    fill: red;
    stroke: blue;
  }

  .right {
    margin-left: auto;
  }
</style>
