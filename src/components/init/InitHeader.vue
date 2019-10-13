<template>
  <div class="init-header">
    <b-square-image :url="logoUrl" :size="140" />
    <b-headline level="1" class="app-name">
      Spotify Magician
    </b-headline>
  </div>
</template>

<script>
import logoUrl from '../../assets/logo.png'

export default {
  name: 'InitHeader',
  data: () => ({
    logoUrl,
  }),
}
</script>
<style lang="scss" scoped>
.init-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50vh;
  text-align: center;
  font-family: var(--font-family);

  .app-name {
    margin-bottom: 20px;
  }
}
</style>
