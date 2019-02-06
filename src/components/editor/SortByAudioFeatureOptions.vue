<template>
  <div>
    <b-radio-button-group
      name="order"
      label="Order"
      class="button-group"
      :options="orderOptions"
      :value="order"
      @change="onOrderChange"
    />
    <b-dropdown
      v-model="sortBy"
      label="Sort By"
      @input="onSortByChange"
    >
      <b-dropdown-item
        v-for="option in sortByOptions"
        :key="option.key"
        :value="option.key"
      >
        {{ option.caption }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { lineChartFeatures, getCaptionForFeatureName } from '../../store/playlist-statistics/supportedAudioFeatures';

export default {
  name: 'SortByAudioFeatureOptions',
  data() {
    return {
      order: 'ASC',
      orderOptions: {
        ASC: 'ASC',
        DESC: 'DESC',
      },
      sortBy: 'valence',
    };
  },
  computed: {
    ...mapState('playlistStatistics', {
      audioFeatures: state => state.playlistAudioFeatures,
    }),
    sortByOptions() {
      return lineChartFeatures.map(featureKey => ({
        key: featureKey,
        caption: getCaptionForFeatureName(featureKey),
      }));
    },
  },
  async mounted() {
    await this.fetchPlaylistAudioFeatures();
  },
  methods: {
    onSortByChange(value) {
      this.sortBy = value;
      this.emitChange();
    },
    onOrderChange(value) {
      this.order = value;
      this.emitChange();
    },
    emitChange() {
      this.$emit('change', {
        sortBy: this.sortBy,
        order: this.order,
        audioFeatures: this.audioFeatures,
      });
    },
    ...mapActions('playlistStatistics', [
      'fetchPlaylistAudioFeatures',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .button-group {
    margin-bottom: 12px;
  }
</style>
