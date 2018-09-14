<template>
  <div class="operation-panel">
    <b-grid>
      <b-row>
        <b-column>
          <start-time-settings/>
        </b-column>
        <b-column>
          <b-button @click="shuffle">Shuffle</b-button>
        </b-column>
      </b-row>
    </b-grid>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import StartTimeSettings from './StartTimeSettings.vue';

export default {
  name: 'EditorOperationPanel',
  components: {
    StartTimeSettings,
  },
  methods: {
    async shuffle() {
      try {
        await this.askForConfirmation();
        console.log('Shuffle');
      } catch (e) {
        // do nothing
      }
    },
    ...mapActions('app', [
      'askForConfirmation',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .operation-panel {
    padding: 12px 0;
    box-shadow: 0 2px 2px 0px rgba(0,0,0,0.1);
    background-color: var(--color-light-grey);
  }
</style>
