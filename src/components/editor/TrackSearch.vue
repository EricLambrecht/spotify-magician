<template>
  <div class="track-search">
    <b-text-input
      v-model="query"
      class="search-input"
      icon="search"
      placeholder="Search for track"
      big
      @input="searchTrack"
    >
      <v-icon v-if="searching" slot="icon" name="spinner" pulse />
      <v-icon v-else slot="icon" name="search" class="icon" />
    </b-text-input>
    <b-list v-if="tracksToAdd.length > 0" class="add-list song-list">
      <b-text class="headline">
        Selected tracks:
      </b-text>
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
    <b-list v-if="loading" class="results">
      <div
        v-for="fakeTrack in [{}, {}, {}, {}, {}, {}, {}, {}]"
        :key="fakeTrack.uri"
        class="track-container"
      >
        <search-playlist-item
          :track="fakeTrack"
          :skeleton="true"
          class="track"
        />
      </div>
    </b-list>
    <b-list v-else-if="searchResult.length > 0" class="results song-list">
      <b-text class="headline">
        Results for
        {{ /* eslint-disable-next-line */ }}
        <b-text class="query" underline>{{ query }}</b-text
        >:
      </b-text>
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
    <div v-else class="results no-results song-list">
      No results :(
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/times'
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
      loading: false,
      searching: false,
    }
  },
  methods: {
    async searchTrack() {
      if (this.query) {
        this.searching = true
        try {
          this.searchResult = await Spotify.searchTracks(this.query)
        } catch (e) {
          await Spotify.handleApiError(this.$store.dispatch, e)
        }
        this.searching = false
      } else {
        this.searchResult = []
      }
    },
    onAddedTrackClick(track) {
      const i = this.tracksToAdd.findIndex(item => item.uri === track.uri)
      this.$delete(this.tracksToAdd, i)
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

.song-list {
  .headline {
    font-size: 12px;
    font-weight: 900;
    color: var(--color-default-light);
    display: block;
    margin-bottom: 6px;

    .query {
      color: var(--color-default);
    }
  }
}

.add-list {
  margin-top: 16px;
  padding: 7px 10px 10px;
  border-radius: 5px;
  box-sizing: border-box;
  max-height: 140px;
  overflow-y: scroll;
  background: var(--color-background-grey);
  border: 1px dotted var(--color-grey);
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
