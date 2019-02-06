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
    <b-radio-button-group
      name="sortBy"
      label="Sort by"
      class="button-group"
      :options="sortByOptions"
      :value="sortBy"
      @change="onSortByChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SortByTrackPropertyOptions',
  data() {
    return {
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
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .button-group {
    margin-bottom: 12px;
  }
</style>
