<template lang="pug">
    div.container
        a.mailto(href='mailto:hello@hakentalk.com' target='_blank') hello＠hakentalk.com
        p メールにてお問い合わせの際は、上記にお願いいたします。
            br
            | Twitterをご利用の方は、DMからも受け付けております。
        a(href='https://twitter.com/hakentalk' target='_blank')
                    img.twitter(src='/img/Twitter_Social_Icon_Circle_Color.svg' width='40' alt='twitter | hakentalk')
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
                title: 'お問い合わせ',
                description: '派遣会議宛にお問い合わせの際は、こちらからお願いいたします。',
                type: 'article',
                url: 'https://hakentalk.com/contact'
            }
        }
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

.mailto {
    font-size: 5rem;
    margin-bottom: 0;
    @media screen and ( max-width: 500px ) {
        font-size: 2rem;
    }
}

p {
    margin-bottom: 2rem;
}

.twitter {
    margin-bottom: 2rem;
}
</style>