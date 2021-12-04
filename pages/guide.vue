<template lang="pug">
  div.container
    h1 ご利用ガイド
    p 派遣会議は、派遣アルバイト（日雇い・単発）について語り合う、匿名チャットサービスです。
    h2.underline 匿名ユーザー
    p 匿名でログインすると、会議室の作成や投稿ができる匿名ユーザーになります。メールアドレスの登録やSNS認証は不要です。
    h2.underline 会議室（チャットルーム）
    p 会議室は作成後、3日後に投稿不可、7日後に閲覧不可になります。会議室はオープンチャットです。誰でも閲覧でるので、ルールを守ってご利用ください。
    h3.underline 会議を開く
    p 匿名または認証してログインすると、会議室を作成することができます。会議の内容（相談したいこと、話したいこと）をわかりやすく記入しましょう。地域を選択することで、地元の人が会議室を探しやすくなります。
    h3.underline 会議を探す
    p 地域ごとに会議室を検索することができます。地元の会議室を探してみましょう。思いがけない情報が手に入るかもしれません。
</template>

<script>
import Meta from '~/assets/mixins/meta'

export default {
  mixins: [Meta],
  fetch ({store}) {
      store.commit('resetModal')
      store.commit('resetModalProfile')
  },
  data() {
    return {
      meta: {
        title: 'ご利用ガイド',
        description: '派遣会議の使い方をご紹介します。',
        type: 'article',
        url: 'https://hakentalk.com/guide'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.25rem;
  margin: 2rem 0 .5rem;
}

h3 {
  margin: 1rem 0 .5rem;
}

p {
  margin-bottom: 1rem;
}
</style>

