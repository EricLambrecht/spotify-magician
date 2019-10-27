<template>
  <b-modal
    :show="show"
    :modal-styles="{
      maxHeight: '75vh',
      overflowY: 'scroll',
      maxWidth: '1100px',
    }"
  >
    <div class="changelog-saljhd98a2ebhs" v-html="html" />
    <div slot="footer">
      <b-button @click="$emit('close')">
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import changelog from '../../../CHANGELOG.md'

export default {
  name: 'ChangelogModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    html() {
      return changelog.replace(/All[\s\S]*guidelines./g, '')
    },
  },
  methods: {
    ...mapActions('app', ['closeModal']),
  },
}
</script>

<style lang="scss">
.changelog-saljhd98a2ebhs {
  h1,
  h2,
  h3 {
    font-size: 22px;
    font-weight: bold;
    margin: 30px 0 10px;
  }

  h3[id^='bug'],
  h3[id^='feature'] {
    font-size: initial;
    font-weight: bold;
    margin: 20px 0 10px;
  }

  h1,
  h2,
  h3 {
    a {
      color: var(--spotify-green);
    }
  }

  p,
  ul {
    font-size: 15px;
    line-height: 1.5;
  }

  ul {
    list-style: disc outside;
    padding-left: 16px;
    li {
      margin-top: 2px;
    }
  }

  a {
    color: #ccc;
    text-decoration: none;
  }
  strong {
    font-weight: 600;
  }

  /* hacky territory... */
  h2 + p ~ h3 + ul + h3 + ul + p,
  h2 + p + ul + p + h3 + ul + p,
  h2 + ul + h3 + ul + h3 + ul + p,
  h2 + ul + h3 + ul + p,
  h2 + h3 + ul + h3 + ul + p,
  h2 + h3 + ul + p,
  h2 + ul + p {
    margin-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 30px;
  }

  h2 + p {
    margin-top: 20px;
  }

  p + ul {
    margin-top: 13px;
    list-style-type: circle;
  }

  h2 + p + ul + p {
    margin-top: 13px;
  }

  p + p {
    margin-top: 13px;
  }
}
</style>
