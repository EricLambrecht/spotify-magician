<template>
  <div class="track-search">
    <b-text-input v-model="query" @input="searchTrack"/>
    <b-list class="results">
      <b-list-item
        v-for="track in searchResult"
        :key="track.uri"
        class="track"
        @click.native="onTrackClick(track.uri)"
      >
        <b-text class="label">
          <b-text bold>{{ track.name }}</b-text> - {{ track.artist }} - {{ track.album }}
        </b-text>
      </b-list-item>
    </b-list>
  </div>
</template>

<script>
import Spotify from '../utils/Spotify';

export default {
  name: 'TrackSearch',
  data() {
    return {
      query: '',
      searchResult: [],
    };
  },
  methods: {
    async searchTrack() {
      if (this.query) {
        this.searchResult = await Spotify.searchTracks(this.query);
      } else {
        this.searchResult = [];
      }
    },
    onTrackClick(uri) {
      this.$emit('select', uri);
    },
  },
};
</script>

<style lang="scss" scoped>
  .results {
    font-size: 13px;
    margin-top: 10px;
  }

  .track {
    border-radius: 3px;
    padding: 8px 10px;
    cursor: pointer;
    display: flex;

    &:not(:first-child) {
      margin-top: 3px;
    }

    &:hover {
      background-color: #F0F0F0;
      position: relative;
      overflow: hidden;
      &::after {
        content: 'Add';
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        display: flex;
        padding: 8px;
        justify-content: flex-end;
        font-weight: bold;
        color: white;
        background-color: var(--spotify-green);
        box-sizing: border-box;
        border-radius: 3px;
      }
      &::before {
        content: '';
        color: transparent;
        position: absolute;
        top: 50%;
        right: -5px;
        height: 50px;
        width: 50px;
        background-color: var(--spotify-green);
        transform: translateY(-50%) rotate(45deg);
        box-shadow: 0 0 2px 10px #F0F0F0;
      }
      /* wow. sorry. */
    }

    .label {
      /* no multilines, please */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
