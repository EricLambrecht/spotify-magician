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
    <b-modal headline="Sort settings" :show="showModal">
      <b-radio-button-group
        name="order"
        label="Order"
        class="button-group"
        :options="orderOptions"
        :value="order"
        @change="onOrderChange"
      />
      <b-radio-button-group
        name="sortBy"
        label="Sort by"
        class="button-group"
        :options="sortByOptions"
        :value="sortBy"
        @change="onSortByChange"
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

export default {
  name: 'SortConfiguration',
  data() {
    return {
      showModal: false,
      order: 'ASC',
      orderOptions: {
        ASC: 'ASC',
        DESC: 'DESC',
      },
      sortBy: 'artists.0.name',
      sortByOptions: {
        'artists.0.name': 'Artist name',
        name: 'Track name',
        popularity: 'Popularity',
        duration_ms: 'Duration',
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
    onSortByChange(value) {
      this.sortBy = value;
    },
    onOrderChange(value) {
      this.order = value;
    },
    async sort() {
      this.showModal = false;
      await this.askForConfirmation({
        headline: 'Sort',
        question: 'Are you sure you want to sort your playlist?',
        positive: 'Sort',
        negative: 'Cancel',
      });
      await this.rearrangePlaylistWith({
        rearranger: SortByTrackProperty,
        options: {
          sortBy: this.sortBy,
          order: this.order,
        },
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
  }
</style>
