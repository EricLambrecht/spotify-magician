<template>
  <div class="loading-screen">
    <init-header />
    <b-text class="status">
      {{ status }}
    </b-text>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logoUrl from '../../assets/logo.png'
import InitHeader from './InitHeader'

export default {
  name: 'AppInitializer',
  components: { InitHeader },
  data: () => ({
    logoUrl,
    status: '',
  }),
  computed: {
    ...mapGetters({
      hasAccess: 'user/hasAccess',
    }),
  },
  async mounted() {
    try {
      this.status = 'Authenticating...'
      await this.$store.dispatch('user/requestToken')
      this.status = 'Fetching playlists...'
      await this.$store.dispatch('user/getPlaylists')
      await this.$router.replace({ name: 'home' })
    } catch (e) {
      if (e.trigger_login) {
        await this.$router.replace({ name: 'login' })
      } else {
        this.addToast({ message: e.message, type: 'error' })
        throw new Error(e)
      }
    }
  },
  methods: {
    ...mapActions('app', ['addToast']),
  },
}
</script>

<style lang="scss" scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-family: var(--font-family);

  .status {
    font-size: 18px;
  }
}
</style>
