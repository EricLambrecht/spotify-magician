<template>
  <b-container v-if="playlistExists">
    <div class="add-button" @click.capture="openModal('add-track')">
      <b-text class="label">
        Add track
      </b-text>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditorTrackAdder',
  computed: {
    ...mapGetters('editor', [
      'playlistExists',
    ]),
  },
  methods: {
    ...mapActions('app', [
      'openModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .add-button {
    display: flex;
    justify-content: center;
    margin: 20px 90px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    background-color: var(--color-light-grey);
    transition: background-color .1s ease;

    .label {
      font-size: 18px;
      font-weight: bold;
      opacity: 0.6;
      transition: opacity .1s ease;
    }

    &:hover {
      background-color: white;
      .label {
        opacity: 0.7;
      }
    }
  }
</style>
