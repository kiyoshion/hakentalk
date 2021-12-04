<template lang="pug">
    div
        no-ssr
            div.loader(v-show="loading")
            div(v-show="!loading")
                div.talkNav
                    div.talkNav__inner.flex.flex--space-between
                        div.talkNav__backLink
                            nuxt-link(:to="{ name: 'area-id', params: { id: talkArea }}") ← {{ areaData[parseInt(talkArea)-1] }}

                div.container
                    talk(:talk="talk")
                
                    transition-group#message-list.flex.flex--column(tag="div")
                        div(v-for="{ uid, displayName, photoURL, body, createdAt, currentDate, id, index, key } in messages" :key="key"  :class="isAuthor(uid)")
                            div.message
                                div.message__userPhoto
                                    div(v-if="photoURL")
                                        img(:src="photoURL" alt="photo | hakentalk" width="50")
                                    div(v-else)
                                        img(src="/img/avatar.svg" alt="avatar | hakentalk" width="50")
                                div.message__meta
                                    div.message__userName(v-if="displayName") {{ displayName }} 
                                        span.message_userId(v-html="formatUserId(uid)")
                                    div.message__userName(v-else) ゲスト 
                                        span.message_userId(v-html="formatUserId(uid)")
                                div.message__content
                                    div.message__body
                                        p {{ body }}
                                    div.message__createdAt
                                        span(v-html="formatDate(createdAt)")
                
                div(v-if="checkTalkStatus(talkCreatedAt) === 'OPEN'")
                    div.fixed.fixed--bottom.messageFormContainer(v-if="isLogin")
                        div.messageForm
                            textarea(rows="1" placeholder="メッセージを入力" v-model="inputBody")
                            button.button.button--yellow.button--big(@click="saveMessage") 送信
                    div.fixed.fixed--bottom.messageFormContainer(v-else)
                        login
                div(v-else)
                    div.fixed.fixed--bottom.messageFormContainer
                        div.board.flex.flex--center
                            p この会議はクローズしました。
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters } from 'vuex'
import Login from '~/components/Login.vue'
import Talk from '~/components/Talk.vue'
import Meta from '~/assets/mixins/meta'

export default {
    mixins: [Meta],
    fetch ({store}) {
        store.commit('resetModal')
        store.commit('resetModalProfile')
    },
    data() {
        return {
            loading: true,
            inputBody: '',
            talk: {},
            // talk: [],
            talkTitle: '',
            talkDescription: '',
            talkAuthorId: '',
            talkPhotoURL: '',
            talkDisplayName: '',
            talkCreatedAt: '',
            talkCreatedDate: '',
            talkArea: '',
            talkSubArea: '',
            talkUsers: '',
            talkUsersNum: 0,
            talkReqForDel: '',
            talkStatus: '',
            currentDate: '',
            status: '',
            messages: [],
            isSetMemo: false,
            firstDay: false,
            secondDay: false,
            thirdDay: false,
            isShowDate: true,
            count_day1: 0,
            count_day2: 0,
            count_day3: 0,
            theday: '',
            day1: '',
            day2: '',
            day3: '',
            theday1: '',
            theday2: '',
            theday3: '',
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
            meta: {
                title: this.talkTitle,
                description: 'この会議は「' + this.talkDescription + '」について語り合います。',
                type: 'article',
                url: 'https://hakentalk.com/talks/' + this.$route.params.id
            }
        }
    },
    layout: 'talk',
    components: {
        Login,
        Talk
    },
    computed: {
        ...mapState(['user']),
        ...mapState(['stocks']),
        ...mapGetters(['isLogin']),
    },
    created() {
        this.getTalk();
    },
    mounted() {
        this.getMessages();
    },
    methods: {
        ...mapActions(['setStocks']),
        ...mapActions(['setUser']),
        setDate() {
            console.log('talkCreatedAt'+this.talkCreatedAt)
        },
        getTalk() {
            const talkRef = firebase.firestore().collection('talks').doc(this.$route.params.id);
            return talkRef.get()
            .then(doc => {
                if (doc.exists) {
                    this.talk = doc.data()
                    let time = ''
                    let date = ''
                    try {
                        time = doc.data().createdAt.toDate()
                        date = this.formatDateMonth(doc.data().createdAt.toDate())
                    }
                    catch(e) {
                        console.log(e)
                    }
                    // let usersNum = 0
                    // if (typeof doc.data().users !== 'undefined' && typeof doc.data().users === 'object' && Object.keys(doc.data().users).length) {
                    //     usersNum = Object.keys(doc.data().users).length
                    // } else {
                    //     usersNum = 1
                    // }
                    // this.talkTitle = doc.data().title,
                    // this.talkDescription = doc.data().description,
                    this.talkCreatedAt = time,
                    this.talkAuthorId = doc.data().authorId,
                    // this.talkDisplayName = doc.data().displayName,
                    // this.talkPhotoURL = doc.data().photoURL,
                    this.talkArea = doc.data().area
                    // this.talkSubArea = doc.data().subArea,
                    // this.talkStatus = doc.data().status,
                    // this.talkUsers = doc.data().users,
                    // this.talkUsersNum = usersNum,
                    // this.talkCreatedDate = date
                } else {
                    console.log('404')
                    this.$router.push({ path: '/404' });
                }
                this.loading = false
            })
            .catch(err => {
                console.log(err)
            })
        },
        getMessages() {
            const messageRef = firebase.firestore().collection('talks').doc(this.$route.params.id).collection('messages').orderBy('createdAt', 'asc');
            messageRef.onSnapshot(snapshot => {
                this.messages = [];
                snapshot.forEach(doc => {
                    let time = ''
                    let date = ''
                    try {
                        time = doc.data().createdAt.toDate()
                        date = this.formatDateMonth(doc.data().createdAt.toDate())
                    }
                    catch(e) {
                        console.log(e)
                    }
                    this.messages.push({
                        key: doc.id,
                        uid: doc.data().uid,
                        displayName: doc.data().displayName,
                        photoURL: doc.data().photoURL,
                        body: doc.data().body,
                        createdAt: time,
                        currentDate: date
                    })
                })
            })
        },
        saveMessage() {
            if(!this.inputBody) {
                return
            } else {
                firebase.firestore().collection('talks').doc(this.$route.params.id).collection('messages').add({
                    uid: this.$store.state.user.uid,
                    displayName: this.$store.state.user.displayName,
                    photoURL: this.$store.state.user.photoURL,
                    body: this.inputBody,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    firebase.firestore().collection('talks').doc(this.$route.params.id).update({
                        users: firebase.firestore.FieldValue.arrayUnion({
                            uid: this.$store.state.user.uid,
                            photoURL: this.$store.state.user.photoURL
                        })
                    })
                    // firebase.firestore().collection('hotMessage').doc('1').set({
                    //     id: this.$route.params.id,
                    //     title: this.talkTitle,
                    //     userId: this.$store.state.user.userId,
                    //     userName: this.$store.state.user.userName,
                    //     body: this.inputBody,
                    //     createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    // })
                    .then(() => {
                        this.inputBody = '';
                        this.scrollToEnd();
                    })
                }).catch(err => {
                    alert(err)
                })
            }
        },
        checkSubArea(area) {
            if ( area == '全域' ) {
                let result = this.areaData[parseInt(this.talkArea)-1]
                return result
            } else {
                return area
            }
        },
        printDate(time) {
            console.log('========== START ==========')
            console.log('time '+time)
            var target = new Date(time)
            var target_mon = target.getMonth() + 1
            var target_day = target.getDate()
            var target_comp = target_mon + '/' + target_day
            // console.log('target_comp '+target_comp)
            this.day1 = this.talkCreatedAt
            var day1_tmp = new Date(this.day1)
            var day1_mon = day1_tmp.getMonth() + 1
            var day1_day = day1_tmp.getDate()
            var day1_comp = day1_mon + '/' + day1_day
            // console.log('day1 '+day1_comp)
            this.day2 = day1_tmp.setDate(day1_tmp.getDate() + 1)
            var day2_tmp = new Date(this.day2)
            var day2_mon = day2_tmp.getMonth() + 1
            var day2_day = day2_tmp.getDate()
            var day2_comp = day2_mon + '/' + day2_day
            // var day2_tmp = day2_tmp.setHours(0, 0, 0, 0)
            // console.log('day2 '+day2_comp)
            this.day3 = day2_tmp.setDate(day2_tmp.getDate() + 1)
            var day3_tmp = new Date(this.day3)
            var day3_mon = day3_tmp.getMonth() + 1
            var day3_day = day3_tmp.getDate()
            var day3_comp = day3_mon + '/' + day3_day
            // var day3_tmp = day3_tmp.setHours(0, 0, 0, 0)
            // console.log('day3 '+day3_comp)
            var day1_time = this.day1.getTime()
            var day2_time = day2_tmp.getTime()
            var day3_time = day3_tmp.getTime()
            var target_time = target.getTime()
            console.log('this.day1 '+day1_time)
            console.log('this.day2 '+day2_time)
            console.log('this.day3 '+day3_time)
            console.log('this.target '+target_time)
            // console.log('this.count_day1 '+this.count_day1)
            // console.log('this.count_day2 '+this.count_day2)
            // console.log('this.count_day3 '+this.count_day3)
            if (target_comp == day1_comp && this.count_day1 == 0) {
                this.count_day1++;
                // this.isShowDate = false
                // this.theday1 = target_comp;
                // this.theday = target_comp;
            } else if (target_comp == day2_comp && this.count_day2 == 0) {
                this.count_day2++;
                // this.isShowDate = false
                // this.theday2 = target_comp;
                // this.theday = target_comp;
            } else if (target_comp == day3_comp && this.count_day3 == 0) {
                this.count_day3++;
                // this.isShowDate = false
                // this.theday3 = target_comp;
                // this.theday = target_comp;
            } else {
                // this.theday = ''
                target_comp = ''
            }

            console.log('theday '+this.theday)
            // return this.theday
            
            // if (this.count_day1 == 0 && target_time > day1_time) {
            //     this.isShowDate = true
            //     this.count_day1++;
            // } else if (this.count_day2 == 0 && target_time > day2_time) {
            //     this.isShowDate = true
            //     this.count_day2++;
            // } else if (this.count_day3 == 0 && target_time > day3_time) {
            //     this.isShowDate = true
            //     this.count_day3++;
            // } else {
            //     this.isShowDate = false
            // }

            // if (this.count_day1 == 0 && target_time > day1_time) {
            //     this.count_day1++;
            // } else if (this.count_day2 == 0 && target_time > day2_time) {
            //     this.count_day2++;
            // } else if (this.count_day3 == 0 && target_time > day3_time) {
            //     this.count_day3++;
            // }
            
            // if (target_time > day2_time) {
            //     this.count_day2++;
            // } else if (target_time > day3_time) {
            //     this.count_day3++;
            // }
            console.log('target_comp ' +target_comp)
            console.log('messages '+this.messages)
            console.log('========== END ==========')
            return target_comp

        },
        setMemo() {
            this.isSetMemo =! this.isSetMemo
        },
        setStock() {
            let date = new Date()
            date.setTime(date.getTime() + 1000*60*60*9)
            let i = Object.keys(this.$store.state.stocks).length
            console.log(i)
            // this.$store.commit('setStocks', i, {
            //     talkId: this.$route.params.id,
            //     talkTitle: this.talkTitle,
            //     stockedAt: date,
            // })
            this.$store.state.stocks.push({
                talkId: this.$route.params.id,
                talkTitle: this.talkTitle
            })
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
        formatDate(time) {
            let date = new Date(time);
            let hour = ('0' + date.getHours()).slice(-2);
            let min = ('0' + date.getMinutes()).slice(-2);
            return hour + ':' + min;
        },
        formatDateYear(time) {
            let date = new Date(time);
            let year = (date.getFullYear())
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hour = ('0' + date.getHours()).slice(-2);
            let min = ('0' + date.getMinutes()).slice(-2);
            return year + '/' + mon + '/' + day + ' ' + hour + ':' + min;
        },
        formatDateOpen(time) {
            let date = new Date(time);
            let limit = new Date(time);
            limit.setDate(limit.getDate() + 3);
            let year = (date.getFullYear())
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let mon3 = ('0' + (limit.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let day3 = ('0' + limit.getDate()).slice(-2);
            return year + '/' + mon + '/' + day + ' - ' + mon3 + '/' + day3;
        },
        formatDateFull(time) {
            let date = new Date(time);
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hour = ('0' + date.getHours()).slice(-2);
            let min = ('0' + date.getMinutes()).slice(-2);
            return mon + '/' + day + ' ' + hour + ':' + min;
        },
        formatDateMonth(time) {
            let date = new Date(time);
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return mon + '/' + day;
        },
        formatUserId(id) {
            return '[' + id.substr(0, 6) + ']'
        },
        scrollToEnd() {
            this.$nextTick(() => {
                window.scrollTo(0, document.body.clientHeight)
            })
        },
        isAuthor(userId) {
            if (this.talkAuthorId === userId) {
                return 'message--host'
            } else {
                return 'message--reverse'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    // background-color: #fcfcfc;
    // background: radial-gradient(circle, rgba(244, 247, 253, 0.5) 0, rgba(244, 247, 253, 0.75) 100%);
    padding-bottom: 10rem;
    @media screen and ( max-width: 769px ) {
        margin-top: 0;
        padding-bottom: 60px;
    }
}

.talkNav {
    display: none;
    &__inner {
        width: 90%;
        max-width: 900px;
        margin: 1rem auto 0;
        align-items: center;
    }
    @media screen and ( max-width: 769px ) {
        display: block;
        &__list {
            display: flex;
        }
        &__item {
            border: 2px solid;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            &:hover {
                cursor: pointer;
            }
            img {
                display: block;
                width: 14px;
                height: 14px;
                margin: 6px auto;
            }
        }
    }
}

.board {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem 0;
    p {
        color: #fff;
    }
    @media screen and ( max-width: 500px ) {
        width: 90%;
    }   
}

@media screen and ( max-width: 500px ) {
    textarea::-webkit-input-placeholder {
        font-size: .8rem;
    }
    textarea:-moz-placeholder {
        font-size: .8rem;
    }
    textarea::-moz-placeholder {
        font-size: .8rem;
    }
    textarea:-ms-input-placeholder {
        font-size: .8rem;
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