<template lang="pug">
    div.editProfile
        div.center(v-if="isLogin")
            div.user__photoURL.center
                img.photoURL(v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="photoURL | 派遣会議" width="40")
                img.photoURL(v-else src="/img/avatar.svg" alt="avatar | 派遣会議" width="40")
            div.user__displayName.center
                p.displayName(v-if="$store.state.user.displayName") {{ $store.state.user.displayName }}
                p.displayName(v-else) ゲスト
        div(v-else)
            div.button__login
                button.button.button--round.button--yellow(@click="$router.push('/login')") ログイン
        div.form__editProfile.center(v-if="isLogin && !$store.state.user.isAnonymous")
            nuxt-link(to="/mypage") マイページ
        div.button__logout.center(v-if="isLogin && !$store.state.user.isAnonymous") 
            button.button(@click="logout") ログアウト
        div.button__logout.center(v-else)
            button.button(@click="logoutForAnonymous") ログアウト
</template>

<script>
import firebase from '@/plugins/firebase.js'
import { mapActions, mapState, mapGetters } from 'vuex'
import 'firebase/firestore'
import Prefs from '~/components/Prefs.vue'

export default {
    data() {
        return {
            inputName: '',
            inputCompany: '',
            selectedArea: 0,
            pickedGender: '',
            editProfileModal: false,
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
        if (this.isLogin) {
            this.setUserData()
        }
    },
    methods: {
        ...mapActions(['setUser']),
        ...mapActions(['logout']),
        ...mapActions(['logoutForAnonymous']),
        // login() {
        //     if(!this.inputName) {
        //         alert('ニックネームを入力してください。')
        //     } else {
        //         firebase.auth().signInAnonymously()
        //         .then(result => {
        //             let str = this.inputName.substring(0, 8)
        //             this.setUser({
        //                 userId: result.user.uid,
        //                 userName: str
        //             })                
        //             this.inputName = this.$store.state.user.displayName
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        //     }
        // },
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
            this.editProfileModal = !this.editProfileModal
        },
        saveProfile() {
            if(!this.inputName) {
                alert('ニックネームを入力してください。')
            } else {
                let str = this.inputName.substring(0, 8)
                this.setUser({
                    uid: this.$store.state.user.uid,
                    displayName: str,
                    photoURL: '/img/avatar.svg',
                    isAnonymous: true
                })
                this.inputName = this.$store.state.user.displayName
            }
        },
        setUserData() {
            this.inputName = this.$store.state.user.displayName
        }
    }
}
</script>

<style lang="scss" scoped>
.userProfile {
    img {
        &:hover {
            cursor: pointer;
        }
    }
}

.user {
    &__photoURL {
        .photoURL {
            border-radius: 50%;
        }
    }
    &__displayName {
        margin-bottom: 1rem;
    }
}

.button {
    &__login {
        margin: 1rem auto;
        text-align: center;
    }
    &__logout {
        margin-top: 1rem;
        .button {
            filter: none;
        }
    }
}

a {
    color: #fff;
}
</style>