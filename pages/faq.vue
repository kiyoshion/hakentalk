<template lang="pug">
  div.container
    h1 よくある質問
    p 派遣会議にてお困りの際はご利用ください。

    h2 匿名ユーザーについて
    h3#aboutUser.question(:class='{ isActive: aboutUser }' @click="toggle('aboutUser')")
      | 匿名ユーザーってなに？
    transition(tag='div')
      p.answer(v-show='aboutUser')
        | メールアドレスの登録やSNS認証をせずに、派遣会議をご利用いただけます。
    h3#removeUser.question(:class='{ isActive: removeUser }' @click="toggle('removeUser')")
      | 匿名ユーザーを削除するには？
    transition(tag='div')
      p.answer(v-show='removeUser')
        | ログアウトすることで匿名ユーザーは削除されます。
    h2 会議室（チャットルーム）について
    h3#removeMessage.question(:class='{ isActive: removeMessage }' @click="toggle('removeMessage')")
      | 投稿を削除するには？
    transition(tag='div')
      p.answer(v-show='removeMessage')
        | 投稿は削除できません。会議室は作成してから7日後に閲覧できなくなります。どうしても削除したい場合は、ご意見箱もしくはお問い合わせからご連絡ください。匿名性のサービスですが、ルールを守ってご利用ください。
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
      aboutUser: false,
      removeUser: false,
      removeMessage: false,
      meta: {
        title: 'よくある質問',
        description: '派遣会議のよくある質問です。',
        type: 'article',
        url: 'https://hakentalk.com/faq'
      }
    }
  },
  methods: {
    toggle(e) {
      if(e == 'removeUser') {
        this.removeUser = !this.removeUser
      } else if (e == 'aboutUser') {
        this.aboutUser = !this.aboutUser
      } else if (e == 'removeMessage') {
        this.removeMessage = !this.removeMessage
      }
    }
  }  
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

p {
  margin-bottom: 1rem;
}

@media screen and ( max-width: 500px ) {
  h2 {
    font-size: 1rem;
  }
  h3 {
    font-size: .8rem;
  }
}

.question {
  font-size: 1rem;
  background-color: #fff;
  margin: 2rem 0 1rem;
  padding: 10px 1rem 10px 0;
  transition: all .2s;
  &::before {
    content: 'Q';
    background-color: #fff000;
    padding: .75rem 1rem;
    margin-right: 1.5rem;
  }
  &::after {
    content: '＋';
    float: right;
  }
  &:hover {
    cursor: pointer;
  }
  &.isActive {
    &::after {
      transform: rotate(-45deg);
    }
  }
  @media screen and ( max-width: 500px ) {
    font-size: .8rem;
    margin: 1rem 0 .5rem;
    padding: 7px .5rem 7px 0;
    &::before {
      padding: .5rem;
      margin-right: .5rem;
    }
  }
}

.answer {
  background-color: #f1f1f1;
  padding: 1rem;
  &::before {
    content: 'A';
    font-size: 1rem;
    margin-right: .5rem;
  }
  @media screen and ( max-width: 500px) {
    &::before {
      font-size: .8rem;
    }
  }
}

.arrow {
  transform: rotate(45deg);
}

.v-enter-active,
.v-leave-active {
  transition: all .2s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

