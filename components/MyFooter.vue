<template lang="pug">
    div.footer
        div.footer__logo.center
            nuxt-link(to="/")
                img(src="/img/hakentalk-logo-round-white.svg" alt="logo | 派遣会議" width="100")
        div.sns.center
            a(href="https://twitter.com/hakentalk" target="_blank")
                img(src="/img/Twitter_Social_Icon_Circle_Color.svg" alt="twitter | 派遣会議")
            a(href="https://github.com/kiyoshion" target="_blank")
                img(src="/img/GitHub-Mark.svg" alt="GitHub | 派遣会議")
        div.footer__inner
            div
                h3 派遣会議とは
                ul
                    li
                        nuxt-link(to="/about") 派遣会議って？
                    li
                        nuxt-link(to="/guide") ご利用ガイド
                    li
                        nuxt-link(to="/faq") よくある質問
                    li
                        nuxt-link(to="/term") 利用規約
            div
                h3 会議
                ul
                    li
                        nuxt-link(to="/area") 会議を探す
                    li
                        nuxt-link(to="/talks") 会議を開く
            div
                h3 運営
                ul
                    li
                        nuxt-link(to="/news") お知らせ
                    li
                        nuxt-link(to="/opinion") ご意見箱
                    li
                        nuxt-link(to="/contact") お問い合わせ
                    li
                        nuxt-link(to="/privacy") プライバシーポリシー
        div.footer__copy
            span COPYRIGHT &copy; 2019 
                nuxt-link(to="/") 派遣会議
</template>

<script>
import Profile from '~/components/Profile.vue'

export default {
    components: {
        Profile
    },
    data() {
        return {
            isTalkPage: false
        }
    },
}
</script>

<style lang="scss" scoped>
.footer {
    &__logo {
        padding: 2rem 0 1rem;
    }
    &__inner {
        padding: 1rem 0;
    }
    @media screen and ( max-width: 500px ) {
        &__logo {
            padding: 1rem 0;
        }
        &__inner {
            padding: 1rem 0;
        }
    }
}
h3 {
    margin: 0 0 .5rem 1rem;
    @media screen and ( max-width: 500px ) {
        font-size: .8rem;
        margin: 0 0 .5rem .5rem;
    }
}

.sns {
    a {
        display: inline-block;
        padding: .25rem;
    }
    img {
        width: 30px;
    }
    @media screen and ( max-width: 500px ) {
        img {
            width: 20px;
        }
    }
}

</style>
