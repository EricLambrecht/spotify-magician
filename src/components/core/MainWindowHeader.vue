<template>
  <div class="header">
    <b-container>
      <div class="content">
        <b-square-image :url="playlistImage" :size="110" />
        <div class="playlist-meta">
          <b-headline
            :class="{ 'playlist-name': true, empty: !playlistExists }"
          >
            {{ playlistName }}
          </b-headline>
          <div class="smaller-info">
            <b-text v-if="playlistExists">
              {{ playlistTrackCount }} songs
            </b-text>
            <b-text v-if="playlistExists">
              {{ playlistLengthMs | formatTime('h [hr.,] mm [min.]') }}
            </b-text>
            <b-badge v-if="playlistExists && playlistIsReadOnly" class="badge">
              read-only
            </b-badge>
          </div>
        </div>
      </div>
    </b-container>
    <main-window-top-menu />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatTime from '../../utils/formatTime'
import MainWindowTopMenu from './MainWindowTopMenu'

export default {
  name: 'MainWindowHeader',
  components: { MainWindowTopMenu },
  filters: {
    formatTime,
  },
  computed: {
    ...mapGetters('editor', [
      'playlistImage',
      'playlistName',
      'playlistTrackCount',
      'playlistExists',
      'playlistLengthMs',
      'playlistIsReadOnly',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  padding: 60px 0;
  position: relative;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.playlist-meta {
  position: relative;
  margin: 0 30px -1px;
}

.playlist-name {
  display: flex;
  align-items: flex-end;

  font-size: var(--font-size-playlist-name);
  &.empty {
    font-size: var(--font-size-choose-playlist);
  }
}

.smaller-info {
  margin: 11px 0 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 15px;
  color: #888;

  :not(:first-child):not(.badge) {
    &::before {
      content: '•';
      margin: 0 5px;
    }
  }

  .badge {
    margin-left: 10px;
  }
}

@media screen and (max-width: 768px) {
  .header {
    background-color: white;
    padding: 80px 0 30px;
    position: relative;
  }

  .smaller-info {
    font-size: 13px;
  }

  .playlist-meta {
    margin-left: 20px;
  }
}
</style>
