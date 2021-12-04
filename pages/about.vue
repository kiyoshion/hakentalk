<template lang="pug">
    div.container
        h1.center
            img(class='center' src='/img/hakentalk-about-ttl.svg' width='200' alt='派遣会議')
        h2.underline Mission
        div.lead.lead--half.lead--noborder
            div.lead__inner
                h3.underline ステマのない、素敵な世界を
                p ライフスタイルに合わせて働ける派遣労働。
                    br
                    | そんな平和な世界にも、ステマは氾濫しています。
                ul
                    li サクラによる口コミ高評価
                    li 派遣会社によるあるある詐欺（架空案件）
                    li ブロガーによるリンクだらけのアフィリエイト
                p 派遣のことは地元のベテランに聞きましょう。
                    br
                    | 地域に寄りそう、派遣会議で。
        //- h2.underline Profile
        //- div.lead.lead--half.lead--noborder
        //-     div.lead__inner
        //-         a(href='https://github.com/kiyoshion' target='_blank')
        //-             img.profile(src='/img/profile.jpg' alt='profile | hakentalk')
        //-         p 学生の頃、よく派遣の仕事をしていました。
        //-             br
        //-             | 好きなときに働ける、なんともいいがいたい安心感。
        //-             br
        //-             | そんな経緯から派遣会議を開発、運営しています。
        nuxt-link.button.button--yellow.button--round(to='/') ホームへもどる
</template>

<script>
import Meta from '~/assets/mixins/meta'

export default {
    mixins: [Meta],
    fetch ({store}) {
        store.commit('resetModal')
        store.commit('resetModalProfile')
    },
    data () {
        return {
            meta: {
                title: 'ステマのない、素敵な世界を。',
                description: '派遣会議は、派遣アルバイトについて語り合う、匿名チャットサービスです。派遣アルバイトをしている人なら、だれでも参加できます。匿名で参加できて、跡に残らないから安心。みなさん同じ境遇です。語り忘れのないよう、お気軽にご参加ください。',
                type: 'article',
                url: 'https://hakentalk.com/about'
            }
        }
    },
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

h1 {
    margin-bottom: 2rem;
}

h2 {
    margin-bottom: 1rem;
}

h3 {
    margin-bottom: 1rem;
}

.lead {
    display: flex;
    justify-content: center;
    text-align: left;
    padding: 3rem;
    margin: 0 0 3rem;
    &--half {
        width: 75%;
    }
    &--noborder {
        border: none;
    }
    &__inner {

    }
    ul {
        margin: 2rem 0;
        padding: 0 0 0 1rem;
    }
    a {
        display: block;
        text-align: center;
    }
    @media screen and ( max-width: 769px ) {
        padding: 2rem;
        &--half {
            width: 75%;
        }
    }
    @media screen and ( max-width: 500px ) {
        &--half {
            width: 100%;
            padding: 1rem;
        }
    }

}

.profile {
    border-radius: 50%;
    width: 50px;
    margin-bottom: 1rem;
    @media screen and ( max-width: 500px ) {
        width: 40px;
        margin-bottom: .5rem;
    }
}
</style>