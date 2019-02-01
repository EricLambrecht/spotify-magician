<template>
  <b-modal :show="show" :modal-styles="{ maxHeight: '75vh', overflowY: 'scroll' }">
    <div v-html="html" class="changelog-saljhd98a2ebhs"/>
    <div slot="footer">
      <b-button @click="$emit('close')">
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';
import changelog from '../../../CHANGELOG.md';

export default {
  name: 'ChangelogModal',
  computed: {
    html() {
      return changelog.replace(/All[\s\S]*guidelines./g, '');
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapActions('app', [
      'closeModal',
    ]),
  },
};
</script>

<style lang="scss">
  .changelog-saljhd98a2ebhs {
    h1 {
      font-size: 22px;
      font-weight: bold;
      margin: 30px 0 10px;
    }
    h2 {
      font-size: 22px;
      font-weight: bold;
      margin: 30px 0 10px;
    }
    h3 {
      font-weight: bold;
      margin: 20px 0 10px;
    }
    h1, h2 {
      a {
        color: var(--spotify-green);
      }
    }
    p, ul {
      font-size: 15px;
    }
    ul {
      list-style: disc;
      li {
        margin-top: 8px;
      }
    }
    a {
      color: #CCC;
      text-decoration: none;
    }

    /* hacky territory... */
    h1 + h3 + ul + h3 + ul + p,
    h1 + h3 + ul + p,
    h1 + ul + p {
      margin-bottom: 10px;
      border-bottom: 1px solid #F0F0f0;
      padding-bottom: 30px;
    }
  }
</style>
