<template lang="pug">
    div
        div(v-if="!isLogin")
            nuxt-link.button.button--round.button--yellow(to="/login") ログイン
        div(v-else)
            div.userProfile(@click="$store.commit('toggleModalProfile')")
                img(v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="photoURL | hakentalk" width="30")
                img(v-else src="/img/avatar.svg" alt="avatar | hakentalk" width="30")
            transition-group(tag="div")
                div#profileModal.modal(v-if="$store.state.isModalProfileActive" key="div")
                    div.modal__inner.modal__inner--right
                        div.user__photoURL.center
                            img(v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="photoURL | hakentalk" width="40")
                            img(v-else src="/img/avatar.svg" alt="avatar | hakentalk" width="40")
                        div.user__displayName.center
                            p.displayName(v-if="$store.state.user.displayName") {{ $store.state.user.displayName }}
                            p.displayName(v-else) ゲスト
                        div.form__editProfile.center(v-if="isLogin && !$store.state.user.isAnonymous")
                            nuxt-link(to="/mypage") マイページ
                        div.button__logout.center(v-if="isLogin && !$store.state.user.isAnonymous")
                            button.button(@click="logout") ログアウト
                        div.button__logout.center(v-else)
                            button.button(@click="logoutForAnonymous") ログアウト
</template>

<script>
import firebase from '@/plugins/firebase.js'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import 'firebase/firestore'
import Prefs from '~/components/Prefs.vue'

export default {
    data() {
        return {
            inputName: '',
            inputCompany: '',
            photoURL: '',
            selectedArea: 0,
            pickedGender: '',
            editProfileModal: false,
            isShow: false
        }
    },
    components: {
        Prefs
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
                        // Nuxtのローカルサーバーで起こるCORSエラーのためこのように設定。本番環境では不要
                        signInSuccessWithAuthResult: (authResult) => {
                        window.location.href = "/"
                        return false 
                        }
                    },
                    signInSuccessUrl: '/',
                    // signInFlow: 'popup', // ログインフロー設定。Nuxtのローカルサーバーで起こるCORSエラーがあるのでpopupがオススメです。
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
        if (this.isLogin) {
            this.setUserData()
        }
    },
    methods: {
        ...mapActions(['setUser']),
        ...mapActions(['logout']),
        ...mapActions(['logoutForAnonymous']),
        createSelectArea() {
            let el = document.getElementById('area');
            for (let i=0; i<this.area.length; i++) {
                let op = document.createElement('option');
                op.value = this.area[i].id;
                op.text = this.area[i].name;
                el.appendChild(op);
            }
        },
        toggleModal() {
            if (this.isLogin) {
                this.setUserData()
            }
            this.editProfileModal = !this.editProfileModal
        },
        saveProfileForAnonymous() {
            if (!this.inputName) {
                alert('ニックネームを入力してください。')
            } else {
                let str = this.inputName.substring(0, 8)
                var user = firebase.auth().currentUser
                user.updateProfile({
                    displayName: str
                }).catch(function(error) {
                    console.log(error)
                })
                this.setUser(user)
                this.$store.commit('toggleModalProfile')
                this.inputName = this.$store.state.user.displayName
            }
        },
        saveProfile() {
            if (!this.inputName) {
                alert('ニックネームを入力してください。')
            } else {
                let str = this.inputName.substring(0, 8)
                var user = firebase.auth().currentUser
                user.updateProfile({
                    displayName: str
                }).catch(function(error) {
                    console.log(error)
                })
                this.setUser(user)
                this.$store.commit('toggleModalProfile')
                this.inputName = this.$store.state.user.displayName
            }
        },
        setUserData() {
            this.inputName = this.$store.state.user.displayName
        },
        toggleFormEditProfile() {
            this.isShow = !this.isShow
        },
    }
}
</script>

<style lang="scss" scoped>
.userProfile {
    img {
        border-radius: 50%;
        width: 30px;
        &:hover {
            cursor: pointer;
        }
    }
}

.firebaseui-idp-list {
    flex-direction: column;
}

.modal {
    position: relative;
    &__inner {
        width: 300px;
        filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, .25));
        &--right {
            top: 20px;
            right: 0;
        }
    }
    @media screen and ( max-width: 500px) {
        &__inner {
            width: 300px;
            &--right {
                top: 20px;
                right: 0;
            }
        }        
    }
}

.user {
    &__photoURL {
        img {
            border-radius: 50%;
        }
        .photoURL {
            border-radius: 50%;
        }
    }
    &__displayName {
        margin-bottom: 1rem;
    }
}

.form__editProfile {
    display: flex;
    align-items: flex-end;
    .formGroup {
        width: 100px;
        &:first-child {
            width: 60%;
        }
    }
}

.button {
    &__logout {
        margin-top: 1rem;
        .button {
            filter: none;
        }
    }
    &__editProfile {
        position: absolute;
        top: 40px;
        right: 20px;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity .2s, transform .2s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>