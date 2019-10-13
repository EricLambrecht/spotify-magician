<template>
  <b-modal
    :headline="pendingConfirmation.headline"
    :show="confirmationIsPending"
  >
    <b-text>{{ pendingConfirmation.question }}</b-text>
    <div slot="footer">
      <b-button-group>
        <b-button tertiary @click="declineConfirmation">
          {{ pendingConfirmation.negative }}
        </b-button>
        <b-button primary @click="acceptConfirmation">
          {{ pendingConfirmation.positive }}
        </b-button>
      </b-button-group>
    </div>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ConfirmationModal',
  computed: {
    ...mapGetters('app', ['pendingConfirmation', 'confirmationIsPending']),
  },
  methods: {
    ...mapActions('app', ['acceptConfirmation', 'declineConfirmation']),
  },
}
</script>

<style lang="scss" scoped>
.confirmation-modal {
}
</style>
