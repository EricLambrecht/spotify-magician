<template>
  <b-container>
    <p>Loading...</p>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AuthTokenRetrieval',
  computed: {
    ...mapGetters({
      hasAccess: 'user/hasAccess',
    }),
  },
  async mounted() {
    try {
      await this.$store.dispatch('user/requestTokens');
      this.$router.push('/');
    } catch (e) {
      this.addToast({ message: e.message, type: 'error' });
      throw new Error(e);
    }
  },
  methods: {
    ...mapActions('app', [
      'addToast',
    ]),
  },
};
</script>

<style scoped>

</style>
