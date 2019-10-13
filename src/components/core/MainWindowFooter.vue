<template>
  <div class="footer">
    <b-text class="version" @click.native="openChangelog">
      v{{ version }}
    </b-text>
    <changelog-modal :show="showChangelog" @close="closeChangelog" />
  </div>
</template>

<script>
import ChangelogModal from './ChangelogModal'
import versionFile from '../../version.json'

export default {
  name: 'MainWindowFooter',
  components: {
    ChangelogModal,
  },
  data() {
    return {
      version: versionFile.version,
      showChangelog: false,
    }
  },
  methods: {
    openChangelog() {
      this.showChangelog = true
    },
    closeChangelog() {
      this.showChangelog = false
    },
  },
}
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
