<template>
  <div class="operation-panel">
    <b-grid>
      <b-row>
        <b-column>
          <start-time-settings/>
        </b-column>
      </b-row>
    </b-grid>
  </div>
</template>

<script>
import StartTimeSettings from './StartTimeSettings.vue';

export default {
  name: 'EditorOperationPanel',
  components: {
    StartTimeSettings,
  },
};
</script>

<style lang="scss" scoped>
  .operation-panel {
    padding: 12px 0;
    box-shadow: 0 2px 2px 0px rgba(0,0,0,0.1);
  }
</style>
