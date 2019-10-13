<template>
  <b-light-switch
    :on="isActive"
    label="Show song tempo"
    @click.native="showTempo(!isActive)"
  />
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TempoSwitch',
  computed: {
    ...mapState('editor', {
      isActive: state => state.displayOptions.showTempo,
    }),
  },
  methods: {
    ...mapActions('editor', ['showTempo']),
  },
}
</script>
