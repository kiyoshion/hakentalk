<template lang="pug">
    div.container
        h2 404
        p ページが見つかりませんでした。
        nuxt-link.button.button--yellow.button--round(to="/") ホームへもどる
</template>

<script>
export default {
    fetch ({store}) {
        store.commit('resetModal')
        store.commit('resetModalProfile')
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60%;
    min-height: 60vh;
    text-align: center;
}

h2 {
    font-size: 5rem;
    margin-bottom: 0;
}

p {
    margin-bottom: 1rem;
}
</style>