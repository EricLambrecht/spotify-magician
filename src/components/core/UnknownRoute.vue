<template>
  <div>
    <b-container>
      <b-headline level="1">
        Oops!
      </b-headline>
      <b-paragraph>
        I don't know how you got here, but the following link will bring you home:
      </b-paragraph>
      <b-paragraph>
        <router-link to="/">
          Go home
        </router-link>
      </b-paragraph>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'UnknownRoute',
};
</script>

<style lang="scss" scoped>

</style>
