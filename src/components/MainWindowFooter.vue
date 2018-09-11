<template>
  <div class="footer">
    <b-text class="version" @click.native="openModal('changelog-modal')">v{{ version }}</b-text>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import versionFile from '../version.json';

export default {
  name: 'MainWindowFooter',
  data() {
    return {
      version: versionFile.version,
    };
  },
  methods: {
    ...mapActions('app', [
      'openModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .footer {
    height: 30px;
    margin-top: auto;
    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .version {
    color: var(--spotify-green);
    font-weight: bold;
    font-size: 14px;
    padding: 10px;
    cursor: pointer;
  }
</style>
