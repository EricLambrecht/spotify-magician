<template>
  <b-modal class="modal changelog-saljhd98a2ebhs">
    <div v-html="html"/>
    <div slot="footer">
      <b-button @click="closeModal('changelog-modal')">Close</b-button>
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
  methods: {
    ...mapActions('app', [
      'closeModal',
    ]),
  },
};
</script>

<style lang="scss">
  .changelog-saljhd98a2ebhs {
    .main {
      max-height: 75vh;
      overflow-y: scroll;
    }

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
