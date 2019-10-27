<template>
  <b-list-item v-if="skeleton" class="skeleton">
    <div class="fake-text" />
  </b-list-item>
  <b-list-item v-else class="playlist-item" tabindex="0">
    <b-square-image :url="track.image" :size="36" class="image" />
    <b-text class="time duration">
      {{ track.duration_ms | formatTime('mm:ss') }}
    </b-text>
    <div class="artist-song-pair">
      <b-text class="song">
        {{ track.name }}
      </b-text>
      <b-text class="artist">
        {{ track.artist }}
      </b-text>
    </div>
  </b-list-item>
</template>

<script>
import formatTime from '../../utils/formatTime'

export default {
  name: 'SearchPlaylistItem',
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format)
    },
  },
  props: {
    track: {
      type: Object,
      required: true,
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
:root {
  --small-track-item-height: 36px;
  --small-track-item-song-font-size: 12px;
  --small-track-item-song-line-height: 15px;
  --small-track-item-artist-font-size: 9px;
  --small-track-item-artist-line-height: 13px;
}

@media screen and (max-width: 1080px) {
  :root {
    --small-track-item-height: 36px;
    --small-track-item-song-font-size: 12px;
    --small-track-item-song-line-height: 15px;
    --small-track-item-artist-font-size: 9px;
    --small-track-item-artist-line-height: 13px;
  }
}
</style>

<style lang="scss" scoped>
.playlist-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--small-track-item-height);

  padding: 0;
  border-radius: 3px;

  background-color: var(--color-default-opposite);
  transition: background-color 0.1s ease;

  font-size: var(--small-track-item-song-font-size);

  &:not(:first-child) {
    margin-top: 5px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: white;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;

    .track-menu {
      opacity: 0; /* TODO: enable */
      pointer-events: initial;
    }
  }

  > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: none;
  }
}

.image {
  min-width: var(--small-track-item-height);
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.time {
  color: var(--color-default);
  min-width: 20px;
  text-align: right;
  margin-left: 14px;
}

.artist-song-pair {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 14px;

  .song {
    font-size: var(--small-track-item-song-font-size);
    line-height: var(--small-track-item-song-line-height);
    color: var(--color-default);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artist {
    font-size: var(--small-track-item-artist-font-size);
    line-height: var(--small-track-item-artist-line-height);
    color: var(--color-grey);
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.skeleton {
  $color-bg: #ddd;

  border-radius: 3px;
  background: $color-bg;
  position: relative;
  height: var(--small-track-item-height);
  padding: 0;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    height: var(--small-track-item-height);
    width: var(--small-track-item-height);
    background: darken($color-bg, 3%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    animation: shine 0.8s ease-out infinite;
  }

  .fake-text {
    border-radius: 3px;
    height: 10px;
    flex-grow: 1;
    background: lighten($color-bg, 5%);
    margin: 0 20px;
  }
}

@keyframes shine {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
