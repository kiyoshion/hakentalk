<template lang="pug">
    div
        no-ssr
            div.container(v-if="isLogin && !$store.state.user.isAnonymous")
                div.user__meta
                    img.user__photo(v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="")
                    img.user__photo(v-else src="/img/avatar.svg" alt="")
                    h2.user__displayName {{ $store.state.user.displayName }}
                h3 開いた会議
                div.flex.flex--space-between.flex--wrap
                    div.talk.visible(v-for="(talk, index) in talks" :key="index")
                        talk(:talk="talk")
                h3 参加した会議
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters } from 'vuex'
import Profile from '~/components/Profile.vue'
import Talk from '~/components/Talk.vue'
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
            userId: '',
            inputBody: '',
            inputTargetURL: '',
            isModal: false,
            talks: [],
            joinedTalks: [],
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
            subAreas: [],
            meta: {
                title: 'マイページ',
                description: 'マイページ',
                type: 'article',
                url: 'https://hakentalk.com/mypage'
            }
        }
    },
    components: {
        Profile,
        Talk
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    created() {
        // this.getUid()
    },
    mounted() {
        // this.getUid()
        this.$nextTick(function () {
            this.getTalks()
        })
    },
    methods: {
        ...mapActions(['setUser']),
        getUid() {
            if (this.userId == '') {
                try {
                    this.userId = this.$store.state.user.uid
                }
                catch(error) {
                    console.log(error)
                }
            }
        },
        getTalks() {
            let self = this
            // if (self.userId == '') {
            //     try {
            //         self.userId = self.$store.state.user.uid
            //     }
            //     catch(error) {
            //         console.log(error)
            //     }
            // }
            // self.userId = self.$store.state.user.uid
            let now = new Date()
            let limit = new Date(now.setDate(now.getDate() - 7))
            const talksRef = firebase.firestore().collection('talks').where('authorId', '==', this.$store.state.user.uid).orderBy('createdAt', 'desc').limit(10)
            talksRef.onSnapshot(snapshot => {
                self.talks = [];
                snapshot.forEach(doc => {
                    self.talks.push({
                        id: doc.id,
                        displayName: doc.data().displayName,
                        photoURL: doc.data().photoURL,
                        title: doc.data().title,
                        description: doc.data().description,
                        users: doc.data().users,
                        createdAt: doc.data().createdAt,
                        subArea: doc.data().subArea
                    })
                })
            })
        },
        getJoinedTalks() {
            let now = new Date()
            let limit = new Date(now.setDate(now.getDate() - 7))
            const joinedTalksRef = firebase.firestore().collection('talks').where('authorId', '==', this.$store.state.user.uid).where('createdAt', '>', limit).orderBy('createdAt', 'desc')
            joinedTalksRef.onSnapshot(snapshot => {
                this.joinedTalks = [];
                snapshot.forEach(doc => {
                    let time = ''
                    try {
                        time = doc.data().createdAt.toDate()
                    }
                    catch(e) {
                        console.log(e)
                    }
                    let usersNum = 0
                    if (typeof doc.data().users !== 'undefined' && typeof doc.data().users === 'object' && Object.keys(doc.data().users).length) {
                        usersNum = Object.keys(doc.data().users).length
                    } else {
                        usersNum = 1
                    }
                    this.talks.push({
                        id: doc.id,
                        displayName: doc.data().displayName,
                        photoURL: doc.data().photoURL,
                        title: doc.data().title,
                        description: doc.data().description,
                        users: doc.data().users,
                        usersNum: usersNum,
                        createdAt: time,
                        subArea: doc.data().subArea
                    })
                    if ( doc.data().subArea != '全域' ) {
                        this.subAreas.push(doc.data().subArea)
                        this.subAreas = this.subAreas.filter(function (x, i, self) {
                            return self.indexOf(x) === i;
                        })
                    }
                })
            })
        },
        getSubArea() {
            return axios.get('/json/m_' + this.$route.params.id + '.json')
            .then(res => {
                this.subAreaData = res.data
            })
        },
        printArea(area) {
            this.subAreaData
        },
        setTargetArea(area, event) {
            this.targetArea = area
            let e = document.getElementsByClassName('filter__item')
            for ( let i = 0; i < e.length; i++ ) {
                e[i].className = 'filter__item'
            }
            event.currentTarget.className = 'filter__item isActive'

        },
        isTargetArea(area) {
            if ( this.targetArea == '全域' ) {
                return false
            } else if ( this.targetArea == area ){
                return false
            } else {
                return true
            }
        },
        checkTalkStatus(time) {
            let date = new Date(time)
            let now = new Date()
            let limit = new Date(date.setDate(date.getDate() + 3))
            if(  limit.getTime() > now.getTime() ) {
                this.status = 'OPEN'
                return 'OPEN'
            } else {
                this.status = 'CLOSE'
                return 'CLOSE'
            }
        },
        checkSubArea(area) {
            if ( area == '全域' ) {
                return this.$store.state.area.areaName
            } else {
                return area
            }
        },
        formatDate(time) {
            let date = new Date(time);
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hour = ('0' + date.getHours()).slice(-2);
            let min = ('0' + date.getMinutes()).slice(-2);
            return mon + '/' + day + ' ' + hour + ':' + min;
        },
        toggleModal() {
            this.isOpenModal = !this.isOpenModal
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 1rem;
}

.user {
    &__meta {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &__photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    &__displayName {
        font-size: 1rem;
        margin: 1rem auto;
    }
}

.modal {
    &__icon {
        margin: 0 auto 1rem;
    }
    &__button {
        margin-top: 2rem;
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