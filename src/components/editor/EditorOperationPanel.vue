<template>
  <div class="operation-panel">
    <b-grid>
      <b-row>
        <b-column>
          <b-button-group class="buttons">
            <b-button
              v-if="!playlistExists || !playlistIsReadOnly"
              :skeleton="!playlistExists"
              tertiary
              @click="onClickShuffle"
            >
              <v-icon slot="icon" name="random" label="shuffle" />
              Shuffle
            </b-button>
            <b-button
              v-if="!playlistExists || !playlistIsReadOnly"
              :skeleton="!playlistExists"
              tertiary
              @click="openSortModal"
            >
              <v-icon slot="icon" name="sort" label="sort" />
              Sort
            </b-button>
            <b-button
              tertiary
              :pressed="showStatistics"
              :skeleton="!playlistExists"
              @click="onClickStatistics"
            >
              <v-icon slot="icon" name="chart-line" label="playlist-stats" />
              Analyze
            </b-button>
          </b-button-group>
        </b-column>
        <b-column class="right switches">
          <tempo-switch />
          <time-of-day-switch />
        </b-column>
      </b-row>
    </b-grid>
    <sort-configuration :show="showSortModal" @close="closeSortModal" />
  </div>
</template>

<script>
import 'vue-awesome/icons/chart-line'
import 'vue-awesome/icons/random'
import 'vue-awesome/icons/sort'
import { mapActions, mapState, mapGetters } from 'vuex'

import TimeOfDaySwitch from './TimeOfDaySwitch'
import TempoSwitch from './TempoSwitch'
import RandomShuffle from '../../playlist-modifications/RandomShuffle'
import SortConfiguration from './SortConfiguration'

export default {
  name: 'EditorOperationPanel',
  components: {
    TimeOfDaySwitch,
    TempoSwitch,
    SortConfiguration,
  },
  data() {
    return {
      showSortModal: false,
    }
  },
  computed: {
    ...mapState('playlistStatistics', {
      showStatistics: state => state.show,
    }),
    ...mapGetters('editor', ['playlistIsReadOnly', 'playlistExists']),
  },
  methods: {
    openSortModal() {
      this.showSortModal = true
    },
    closeSortModal() {
      this.showSortModal = false
    },
    async onClickShuffle() {
      const confirmed = await this.askForConfirmation({
        headline: 'Shuffle',
        question: 'Are you sure you want to shuffle your playlist?',
        positive: 'Shuffle',
        negative: 'Cancel',
      })

      if (!confirmed) return

      try {
        await this.rearrangePlaylistWith({
          rearranger: RandomShuffle,
        })
      } catch (e) {
        this.spawnErrorToast({
          message: e.message,
          dismissible: false,
        })
      }
    },
    onClickStatistics() {
      if (this.showStatistics) {
        this.closePlaylistStatistics()
        return
      }

      try {
        this.openPlaylistStatistics()
      } catch (e) {
        this.spawnErrorToast({
          message: e.message,
          dismissible: false,
        })
      }
    },
    ...mapActions('app', [
      'askForConfirmation',
      'spawnErrorToast',
      'openModal',
    ]),
    ...mapActions('editor', ['rearrangePlaylistWith']),
    ...mapActions('playlistStatistics', [
      'openPlaylistStatistics',
      'closePlaylistStatistics',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.operation-panel {
  padding: 12px 0;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--color-light-grey);
}

.fa-icon {
  color: var(--spotify-green);
  font-size: 18px;
  width: 18px;
}

.right {
  margin-left: auto;
}

.switches {
  > *:not(:first-child) {
    margin-left: 12px;
  }
}

@media screen and (max-width: 768px) {
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    left: -5px;

    > *:not(:first-child) {
      margin-top: 5px;
      margin-left: 0px;
    }
  }

  .switches {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > *:not(:first-child) {
      margin: 5px 0 0;
    }
  }
}
</style>
