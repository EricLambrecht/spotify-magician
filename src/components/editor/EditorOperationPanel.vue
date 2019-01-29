<template>
  <div class="operation-panel">
    <b-grid>
      <b-row>
        <b-column>
          <b-button tertiary @click="onClickShuffle">
            <v-icon
              slot="icon"
              name="random"
              label="shuffle"
            />
            Shuffle
          </b-button>
          <b-button tertiary @click="onClickShuffle">
            <v-icon
              slot="icon"
              name="sort"
              label="shuffle"
            />
            Sort
          </b-button>
          <b-button tertiary @click="onClickStatistics">
            <v-icon
              slot="icon"
              name="chart-line"
              label="playlist-stats"
            />
            Analyze
          </b-button>
        </b-column>
        <b-column class="right">
          <time-of-day-switch />
        </b-column>
      </b-row>
    </b-grid>
  </div>
</template>

<script>
import 'vue-awesome/icons/chart-line';
import 'vue-awesome/icons/random';
import 'vue-awesome/icons/sort';
import { mapActions, mapState } from 'vuex';

import TimeOfDaySwitch from './TimeOfDaySwitch.vue';
import shuffle from '../../editor-operations/shuffle';

export default {
  name: 'EditorOperationPanel',
  components: {
    TimeOfDaySwitch,
  },
  computed: {
    ...mapState('editor', {
      showStatistics: state => state.playlistStatistics.show,
    }),
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
      if (this.showStatistics) {
        this.closePlaylistStatistics();
        return;
      }

      try {
        await this.fetchPlaylistAudioFeatures();
        this.openPlaylistStatistics();
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
    ]),
    ...mapActions('editor', [
      'rearrangePlaylistWith',
      'openPlaylistStatistics',
      'closePlaylistStatistics',
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

  .fa-icon {
    color: var(--spotify-green);
    font-size: 18px;
  }

  .right {
    margin-left: auto;
  }
</style>
