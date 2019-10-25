<template>
  <div class="track-search">
    <b-text-input
      v-model="query"
      class="search-input"
      icon="search"
      big
      @input="searchTrack"
    >
      <v-icon slot="icon" name="search" class="icon" />
    </b-text-input>
    <b-list v-if="tracksToAdd.length > 0" class="add-list">
      <div
        v-for="track in tracksToAdd"
        :key="track.uri"
        class="track-container"
      >
        <search-playlist-item
          :track="track"
          class="track"
          @click.native="onAddedTrackClick(track)"
        />
        <v-icon name="times" class="icon" />
      </div>
    </b-list>
    <b-list v-if="searchResult.length > 0" class="results">
      <div
        v-for="track in searchResult"
        :key="track.uri"
        class="track-container"
      >
        <search-playlist-item
          :track="track"
          class="track"
          @click.native="onResultTrackClick(track)"
        />
        <v-icon name="plus" class="icon" />
      </div>
    </b-list>
    <div v-else class="results no-results">
      No results :(
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/times'
import pull from 'lodash/pull'
import Spotify from '../../utils/Spotify'
import SearchPlaylistItem from './SearchPlaylistItem'

export default {
  name: 'TrackSearch',
  components: { SearchPlaylistItem },
  data() {
    return {
      query: '',
      searchResult: [],
      tracksToAdd: [],
    }
  },
  methods: {
    async searchTrack() {
      if (this.query) {
        this.searchResult = await Spotify.searchTracks(this.query)
      } else {
        this.searchResult = []
      }
    },
    onAddedTrackClick(track) {
      pull(this.tracksToAdd, track)
      this.emitTrackUris()
    },
    onResultTrackClick(track) {
      this.tracksToAdd.push(track)
      this.emitTrackUris()
    },
    emitTrackUris() {
      const uris = this.tracksToAdd.map(track => track.uri)
      this.$emit('select', uris)
    },
  },
}
</script>

<style lang="scss" scoped>
.track-search {
  display: flex;
  flex-direction: column;
}

.add-list {
  margin-top: 16px;
  padding: 11px 10px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  max-height: 280px;
  overflow-y: scroll;
  background: var(--spotify-green-light);
  flex-shrink: 0;

  .track-container:hover {
    color: var(--color-danger);
  }
}

.results {
  margin-top: 16px;
  padding: 11px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: scroll;
  background: var(--color-background-grey);
}

.track-container {
  position: relative;
  color: var(--spotify-green);

  &:not(:first-child) {
    margin-top: 5px;
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: none;
  }

  &:hover {
    .icon {
      display: block;
    }
  }
}

.search-input {
  display: block;
  width: 100%;
}

.no-results {
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: #ccc;
}
</style>
