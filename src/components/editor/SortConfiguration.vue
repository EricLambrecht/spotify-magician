<template>
  <div class="container">
    <b-button
      tertiary
      class="toggle"
      @click="openModal"
    >
      <v-icon
        slot="icon"
        name="sort"
        label="sort"
      />
      Sort
    </b-button>
    <b-modal
      headline="Sort settings"
      :show="showModal"
      :modal-styles="{ minWidth: '400px' }"
    >
      <b-radio-button-group
        name="sortMode"
        label="Sort Mode"
        class="button-group"
        :options="sortModeOptions"
        :value="sortMode"
        @change="onSortModeChange"
      />
      <SortByTrackPropertyOptions
        v-show="sortMode === 'trackProperty'"
        @change="onOptionsChange"
      />
      <SortByAudioFeatureOptions
        v-show="sortMode === 'audioFeature'"
        @change="onOptionsChange"
      />
      <div slot="footer">
        <b-button-group>
          <b-button tertiary @click="closeModal">
            Close
          </b-button>
          <b-button primary @click="sort">
            Sort
          </b-button>
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/sort';
import { mapActions } from 'vuex';

import SortByTrackProperty from '../../playlist-modifications/SortByTrackProperty';
import SortByTrackPropertyOptions from './SortByTrackPropertyOptions';
import SortByAudioFeature from '../../playlist-modifications/SortByAudioFeature';
import SortByAudioFeatureOptions from './SortByAudioFeatureOptions';

export default {
  name: 'SortConfiguration',
  components: { SortByAudioFeatureOptions, SortByTrackPropertyOptions },
  data() {
    return {
      showModal: false,
      options: {
        order: 'ASC',
        sortBy: 'artists.0.name',
      },
      sortMode: 'trackProperty',
      sortModeMap: {
        trackProperty: SortByTrackProperty,
        audioFeature: SortByAudioFeature,
      },
      sortModeOptions: {
        trackProperty: 'Track Property',
        audioFeature: 'Audio Feature',
      },
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    onOptionsChange(options) {
      this.options = options;
    },
    onSortModeChange(sortMode) {
      this.sortMode = sortMode;
    },
    async sort() {
      this.showModal = false;
      const confirmed = await this.askForConfirmation({
        headline: 'Sort',
        question: 'Are you sure you want to sort your playlist?',
        positive: 'Sort',
        negative: 'Cancel',
      });

      if (!confirmed) return;

      await this.rearrangePlaylistWith({
        rearranger: this.sortModeMap[this.sortMode],
        options: this.options,
      });
    },
    ...mapActions('app', [
      'askForConfirmation',
    ]),
    ...mapActions('editor', [
      'rearrangePlaylistWith',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: inline-block;
  }

  .button-group {
    margin-bottom: 12px;
  }

  .toggle {
    margin: 0;
  }

  .fa-icon {
    color: var(--spotify-green);
    font-size: 18px;
    width: 18px;
  }
</style>
