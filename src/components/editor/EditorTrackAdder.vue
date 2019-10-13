<template>
  <b-container v-if="playlistExists">
    <div class="add-button" @click.capture="openModal">
      <b-text class="label">
        Add track
      </b-text>
    </div>
    <add-track-modal :show="showModal" @close="closeModal" />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddTrackModal from './AddTrackModal'

export default {
  name: 'EditorTrackAdder',
  components: { AddTrackModal },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapGetters('editor', ['playlistExists']),
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
}
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
  transition: background-color 0.1s ease;

  .label {
    font-size: var(--font-size-add-track-button);
    font-weight: bold;
    opacity: 0.6;
    transition: opacity 0.1s ease;
  }

  &:hover {
    background-color: white;
    .label {
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 768px) {
    margin: 20px auto;
  }
}
</style>
