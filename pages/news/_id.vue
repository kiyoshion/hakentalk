<template lang="pug">
    div.container
        div.news
            h1.news__ttl {{ title }}
            span.news__tag {{ tag }}
            span.news__createdAt {{ formatDateYear(createdAt) }}
            p.news__body {{ body }}
        div.back.center
            nuxt-link.button.button--round.button--yellow(to="/news") 一覧にもどる
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters } from 'vuex'
import Login from '~/components/Login.vue'
import Meta from '~/assets/mixins/meta'

export default {
    mixins: [Meta],
    fetch ({store}) {
        store.commit('resetModal')
        store.commit('resetModalProfile')
    },
    data() {
        return {
            news: {},
            title: '',
            body: '',
            tag: '',
            createdAt: '',
            meta: {
                title: 'お知らせ',
                description: '派遣会議からのお知らせです。',
                type: 'article',
                url: 'https://hakentalk.com/news/' + this.$route.params.id
            }
        }
    },
    components: {
        Login
    },
    computed: {
        ...mapState(['user']),
        ...mapState(['stocks']),
        ...mapGetters(['isAuthenticated']),
    },
    created() {
    },
    mounted() {  
        this.getNews()
    },
    methods: {
        ...mapActions(['setStocks']),
        ...mapActions(['setUser']),
        setDate() {
            console.log('talkCreatedAt'+this.talkCreatedAt)
        },
        getNews() {
            fetch('https://hakentalk.microcms.io/api/v1/news/' + this.$route.params.id, {
                headers: { 'X-API-KEY': '54e791d8-f599-40af-95e3-1f08ff537ec4' }
                })
                .then(res => res.json())
                .then(result => {
                    this.title = result.title
                    this.body = result.body
                    this.tag = result.tag
                    this.createdAt = result.createdAt
                    this.news = result
                });
        },
        formatDateYear(time) {
            let date = new Date(time);
            let year = (date.getFullYear())
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return year + '/' + mon + '/' + day;
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    min-height: 50vh;
}

.news {
    &__ttl {
        margin-bottom: 1rem;
    }
    &__createdAt {
        margin-bottom: .5rem;
    }
    &__tag {
        display: inline-block;
        background-color: #fff000;
        border: 2px solid #222;
        font-size: .6rem;
        margin-right: .5rem;
        padding: .25rem;
    }
    &__body {
        margin-top: 1rem;
        white-space: pre-wrap;
    }
}

.back {
    margin-top: 2rem;
}
</style>