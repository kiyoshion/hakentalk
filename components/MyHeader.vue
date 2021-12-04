<template lang="pug">
    div.header
        div.header__inner
            div.header__logo
                nuxt-link(to="/")
                    img(src="/img/hakentalk-logo-round-black.svg" alt="logo | 派遣会議" width="80")
            div.header__nav
                ul
                    li
                        nuxt-link(to="/area") 会議を探す
                    li
                        nuxt-link(to="/talks") 会議を開く
                    //- li
                    //-     nuxt-link(to="/groups") グループを探す
                profile
</template>

<script>
import Profile from '~/components/Profile.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    components: {
        Profile
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    methods: {
        ...mapActions(['setUser']),
    }
}
</script>

<style lang="scss" scoped>
.header {
    @media screen and ( max-width: 769px ) {
        padding: 1rem 0;
        &__nav {
            display: none;
        }
    }
}
ul {
    margin-right: 1rem;
    li {
        img {
            width: 20px;
            height: 20px;
            margin-right: .25rem;
            vertical-align: sub;
            object-fit: contain;
        }
    }
    @media screen and ( max-width: 500px ) {
        li {
            text-align: center;
            img {
                display: block;
                margin: 0 auto;
            }
        }
    }
}
</style>
