<template>
  <b-modal headline="Add track" :show="show" mobile-full-width>
    <track-search class="adder" @select="updateTracks" />
    <div slot="footer">
      <b-button @click="$emit('close')">
        Cancel
      </b-button>
      <b-button :disabled="!uris" primary @click="addTracks">
        {{ `Add ${uris.length} track${uris.length > 1 ? 's' : ''}` }}
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import TrackSearch from './TrackSearch'

export default {
  name: 'AddTrackModal',
  components: { TrackSearch },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      uris: [],
    }
  },
  methods: {
    ...mapActions('editor', ['appendTracksToPlaylist']),
    updateTracks(uris) {
      this.uris = uris
    },
    addTracks() {
      this.appendTracksToPlaylist(this.uris)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.adder {
  width: 600px;
  height: 405px;
}

@media screen and (max-width: 768px) {
  .adder {
    min-width: 100%;
    width: 100%;
    height: 65vh;
  }
}
</style>
