<template lang="pug">
    div.container
        h1 お知らせ
        ul.news
            li.news__item(v-for="(data, index) in news" :key="index")
                nuxt-link.news__link(:to="{name: 'news-id', params: {id: data.id}}")
                    span.news__tag {{ data.tag }}
                    span.news__createdAt {{ formatDateYear(data.createdAt) }}
                    span.news__title {{ data.title }}
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters } from 'vuex'
import Profile from '~/components/Profile.vue'
import axios from 'axios'
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
            meta: {
                title: 'お知らせ',
                description: '派遣会議のお知らせ一覧です。',
                type: 'article',
                url: 'https://hakentalk.com/news'
            }
        }
    },
    components: {
        Profile
    },
    computed: {
        ...mapState(['area']),
        ...mapGetters(['isArea']),
        ...mapState(['user']),
        ...mapGetters(['isAuthenticated']),
    },
    created() {
        
    },
    mounted() {
        this.getNews();
    },
    methods: {
        getNews() {
            fetch('https://hakentalk.microcms.io/api/v1/news', {
                headers: { 'X-API-KEY': '54e791d8-f599-40af-95e3-1f08ff537ec4' }
                })
                .then(res => res.json())
                .then(result => {
                    this.news = result.contents
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
</style>