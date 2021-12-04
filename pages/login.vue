<template lang="pug">
    div.container
        h2 ログイン
        div.flex.flex--space-between
            div.flex__container(v-if="!isLogin")
                h3.center 匿名ログイン
                div.formGroup.formGroup--full.formGroup--flex
                    input#term(type="checkbox" v-model="term")
                    label(for="term")
                        nuxt-link.link--underline(to="/term" target="_blank") 利用規約
                            | に同意する
                div.formGroup.center
                    button.button.button--round.button--yellow(@click="login") 匿名ではじめる
            div.flex__container(v-if="!isLogin")
                h3.center 認証ログイン
                no-ssr
                    div#firebaseui-auth-container
            div.flex__container(v-if="isLogin && $store.state.user.isAnonymous")
                h3.center 認証ログイン
                p.center 匿名ユーザーを削除すると、認証ログインができます。
                div.formGroup.center
                    button.button.button--round.button--yellow(@click="logoutForAnonymous") 匿名ユーザーを削除する

        div.logout__container.center(v-if="isLogin && !$store.state.user.isAnonymous")
            h3 お疲れ様です。{{ $store.state.user.displayName }}さん。
            button.button.button--round(@click="logout") ログアウト
        div.links
            p.small(v-if="!isLogin") ※認証ログインのボタンが表示されない場合、ページを更新してください。
            nuxt-link.small.link--underline(v-if="!isLogin" to="/guide#aboutUser") 匿名ログインってなに？
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
            inputName: '',
            isModal: false,
            uiConfig: {},
            term: true,
            meta: {
                title: 'ログイン',
                description: '派遣会議のログインはこちら。',
                type: 'article',
                url: 'https://hakentalk.com/login'
            }
        }
    },
    components: {
        Profile
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    created() {
    },
    mounted() {
        const firebaseui = require('firebaseui-ja')
        require('firebaseui-ja/dist/firebaseui.css')
        firebase.auth().onAuthStateChanged(user => {
            if (!user || this.$store.state.user.isAnonymous) {
                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
                const config = {
                    signInOptions: [
                        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        firebase.auth.FacebookAuthProvider.PROVIDER_ID
                    ],
                    callbacks: {
                        signInSuccessWithAuthResult: (authResult) => {
                            return true 
                        }
                    },
                    signInSuccessUrl: '/',
                    signInFlow: 'popup',
                    tosUrl: 'https://hakentalk.com/term',
                    privacyPolicyUrl: 'https://hakentalk.com/privacy'
                }
            try{
                ui.start('#firebaseui-auth-container', config)
            }
            catch(e) {
                console.log(e)
            }
        }
      })
    },
    updated() {
    },
    methods: {
        ...mapActions(['setUser']),
        ...mapActions(['logout']),
        ...mapActions(['logoutForAnonymous']),
        login() {
            if(!this.term) {
                alert('利用規約の同意が必要です。')
            } else {
                firebase.auth().signInAnonymously()
                .then(result => {
                    // let str = this.inputName.substring(0, 8)
                    this.$router.push('/')
                    // firebase.auth().onAuthStateChanged(function(user) {
                    //     if (user) {
                    //         user.updateProfile({
                    //             displayName: str,
                    //             photoURL: '/img/avatar.svg'
                    //         }).then(function(user) {
                    //             this.setUser(user)
                    //         }).catch(function(error) {
                    //             console.log(error)
                    //         })
                    //     }
                    // })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        // googleLogin() {
        //     firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        //     .then(result => {
        //         firebase.firestore().collection('users').doc(result.user.uid).set({
        //             userName: result.user.displayName,
        //             photoURL: result.user.photoURL,
        //             providerId: result.user.providerId,
        //             createdAt: firebase.firestore.FieldValue.serverTimestamp()
        //         })
        //         console.log('user'+result.user)
        //         this.setUser({
        //             userId: result.user.uid,
        //             userName: result.user.displayName,
        //             providerId: result.user.providerId,
        //             photoURL: result.user.photoURL,
        //         })
        //             // this.$store.commit('toggleModalProfile')
        //             // this.inputName = this.$store.state.user.userName
        //             this.$router.push('/')
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },
        // logout() {
        //     firebase.auth().signOut()
        //     .then(() => {
        //         this.setUser(null)
        //     }).catch((err) => {
        //         alert(err)
        //     })
        // },
        // setUserCommit(user) {
        //     this.setUser({
        //         userId: user.uid,
        //         userName: user.displayName.substring(0, 8),
        //         photoURL: user.photoURL,
        //         provider: user.providerData
        //     })
        // }
    }
}
</script>


<style lang="scss" scoped>
.container {
    min-height: 50vh;
}

.button {
    margin-top: 1rem;
}

.flex {
    &__container {
        background-color: #fff;
        border-radius: .5rem;
        width: 48%;
        margin: 1rem auto;
        padding: 2rem;
    }
    @media screen and ( max-width: 500px ) {
        flex-wrap: wrap;
        &__container {
            width: 100%;
        }
    }
}

.formGroup--flex {
    margin: 2rem auto 0;
    @media screen and ( max-width: 500px) {
        flex-direction: row;
        align-items: center;
    }
}

.logout__container {
    margin: 1rem auto;
    h3 {
        margin-bottom: 0;
    }
}
</style>