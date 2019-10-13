<template>
  <div class="loading-screen">
    <b-square-image :url="logoUrl" :size="140" />
    <b-headline level="1" class="headline">
      Spotify Magician
    </b-headline>
    <b-text class="status">
      {{ status }}
    </b-text>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logoUrl from '../../assets/logo.png'

export default {
  name: 'AppInitializer',
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
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  font-family: var(--font-family);

  .headline {
    margin-bottom: 20px;
  }

  .status {
    font-size: 18px;
  }
}
</style>
