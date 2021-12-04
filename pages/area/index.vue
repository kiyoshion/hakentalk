<template lang="pug">
    div.container
        h2 会議を探す
        areas
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters } from 'vuex'
import Areas from '~/components/Areas.vue'
import Meta from '~/assets/mixins/meta'

export default {
    mixins: [Meta],
    fetch ({store}) {
        store.commit('resetModal')
        store.commit('resetModalProfile')
    },
    data() {
        return {
            talks: [],
            meta: {
                title: '会議を探す',
                description: 'こちらから地域ごとに会議室を探すことができます。',
                type: 'article',
                url: 'https://hakentalk.com/area/'
            }
        }
    },
    components: {
        Areas
    },
}
</script>