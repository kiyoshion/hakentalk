<template lang="pug">
  div.container
    h1(v-if="error.statusCode === 404") ページが見つかりません。
    h1(v-else) エラーが発生しました
    nuxt-link(to="/") ホームへもどる
</template>

<script>
export default {
  props: ['error'],
}
</script>