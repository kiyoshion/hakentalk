<template lang="pug">
    div.loginForm
        input#term(type="checkbox" v-model="term")
        label(for="term")
            nuxt-link.link--underline(to="/term" target="_blank") 利用規約
            | に同意する
        button.button.button--yellow(@click="login") 匿名ではじめる
</template>

<script>
import firebase from '@/plugins/firebase.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import 'firebase/firestore'

export default {
    data() {
        return {
            inputName: '',
            term: true
        }
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    mounted() {
        if (this.isLogin) {
            this.setUserData()
        }
    },
    methods: {
        ...mapActions(['setUser']),
        login() {
            if(!this.term) {
                alert('利用規約の同意が必要です。')
            } else {
                firebase.auth().signInAnonymously()
                .then(result => {
                    this.$router.push({ path: `/talks/${this.$route.params.id}` });
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        setUserData() {
            this.inputName = this.$store.state.user.displayName
        }
    }
}
</script>

<style lang="scss" scoped>
.loginForm {
    input {
        // width: 60%;
        width: 20px;
        margin-right: .5rem;
    }
    label,
    a,
    a:visited {
        color: #fff;
    }
    @media screen and ( max-width: 500px ) {
        input {
            // width: 50%;
            // padding: .25rem .5rem;
        }
    }
}
</style>