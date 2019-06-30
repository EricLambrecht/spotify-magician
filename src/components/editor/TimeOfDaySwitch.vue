<template>
  <b-light-switch
    :on="isActive"
    label="Show time of day"
    @click.native="showTimeOfDay(!isActive)"
  />
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TimeOfDaySwitch',
  data() {
    return {
      timeOfDayStartHour: 18,
      timeOfDayStartMinute: 0,
    };
  },
  computed: {
    ...mapState('editor', {
      isActive: state => state.displayOptions.showTimeOfDay,
    }),
  },
  methods: {
    ...mapActions('editor', [
      'showTimeOfDay',
    ]),
  },
};
</script>
