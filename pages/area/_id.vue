<template lang="pug">
    div
        div.loader(v-show="loading")
        div(v-show="!loading")
            div.containerWrapper
                div.container
                    div.flex.flex--center
                        h1.ttl {{ prefName }}の派遣事情
                        transition(name="left-little")
                            div.addButton(v-if="isLogin && isActiveTab == 'talk'")
                                a(@click="toggleModal") ＋ 会議を開く
                                //- button.button.button--yellow.button--round(@click="toggleModal") 会議を開く
                        
            div.tab
                div.tabsWrapper
                    div.tabs
                        input#talk(type="radio" value="talk" v-model="isActiveTab")
                        label(for="talk") 会議室

                div.container
                    div.tabContents(key="div")
                        transition(name="left" mode="out-in")
                            div(v-if="isActiveTab == 'talk'")
                                    div.filter.flex.flex--wrap
                                        //- div.filter__item.isActive(@click="setTargetArea('全域', $event)" v-model="targetArea") {{ prefName }}全域
                                        //- div.filter__item(v-for="(data, index) in subAreas" :key="index" @click="setTargetArea(data, $event)" v-model="targetArea") {{ data }}
                                        div.filter__item(@click="checkFilter('全域', $event)" :class="{isActive: setCurrentFilter('全域')}")
                                            input(type="radio" id="areaAll" name="pickedArea" v-model="pickedArea" value="全域")
                                            label(for="areaAll") {{ prefName }}全域
                                        div.filter__item(v-for="(data, index) in subAreas" :key="index" @click="checkFilter(data, $event)" :class="{isActive: setCurrentFilter(data)}")
                                            input(type="radio" :id="'area'+index" name="pickedArea" v-model="pickedArea" :value="data")
                                            label(:for="'area'+index") {{ data }}
                                    //- transition-group.flex.flex--space-between.flex--wrap(tag="div" appear)
                                    div.flex.flex--space-between.flex--wrap
                                        //- div.talk.visible(v-for="(talk, index) in talks" :key="index" :class="{invisible: isTargetArea(talk.subArea)}")
                                        div.talk.visible(v-for="(talk, index) in talks" :key="index" :class="{invisible: checkTargetArea(talk.subArea)}")
                                            talk(:talk="talk")
                        transition(name="right" mode="out-in")
                            div(v-if="isActiveTab == 'group'")
                                div.filter.flex.flex--wrap
                                    //-     div.filter__itemForGroup.isActive(@click="setTargetAreaForGroup('全域', $event)") {{ prefNameForGroup }}全域
                                    //-     div.filter__itemForGroup(v-for="(data, index) in subAreasForGroup" :key="index" @click="setTargetAreaForGroup(data, $event)") {{ data }}
                                    div.filter__item(@click="checkFilterForGroup('全域', $event)" :class="{isActive: setCurrentFilterForGroup('全域')}")
                                            input(type="radio" id="areaGroupAll" name="pickedAreaForGroup" v-model="pickedAreaForGroup" value="全域")
                                            label(for="areaGroupAll") {{ prefName }}全域
                                    div.filter__item(v-for="(data, index) in subAreasForGroup" :key="index" @click="checkFilterForGroup(data, $event)" :class="{isActive: setCurrentFilterForGroup(data)}")
                                        input(type="radio" :id="'areaGroup'+index" name="pickedAreaForGroup" v-model="pickedAreaForGroup" :value="data")
                                        label(:for="'areaGroup'+index") {{ data }}
                                //- //- transition-group.flex.flex--space-between.flex--wrap(tag="div" appear)
                                div.flex.flex--space-between.flex--wrap
                                    div.group.visible(v-for="(group, index) in groups" :key="index" :class="{invisible: checkTargetAreaForGroup(group.subArea)}")
                                        group(:group="group")

            transition-group
                div.modal.modal--full(v-if="isOpenModal" key="div" @click.self="isOpenModal=!isOpenModal")
                    div.modal__inner
                        h3.center 会議室を作成
                        div.form
                            div.formGroup
                                label(for="title") タイトル
                                    span.red *
                                input#title(type="text" name="title" v-model="inputTitle" placeholder="ex. 〇〇周辺のおすすめの職場は？")
                            div.formGroup
                                label(for="description") 説明文
                                textarea#description(name="description" cols="30" rows="5" v-model="inputDescription")
                            div.formGroup
                                label(for="subArea") 地域
                                    span.red *
                                select#subArea(v-model="selectedSubArea" name="subArea")
                                    option(value="全域") {{ $store.state.area.areaName }}全域
                                    option(v-for="(data, index) in subAreaData" :key="index") {{ data.m_name }}
                        div.formGroup.formGroup--buttons.center
                            button.button.button--round(@click="isOpenModal=!isOpenModal") キャンセル
                            button.button.button--yellow.button--round(@click="createTalk") 会議を開く

</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import 'firebase/storage'
import { mapActions, mapState, mapGetters } from 'vuex'
import axios from 'axios'
import Login from '~/components/Login.vue'
import Talk from '~/components/Talk.vue'
import Group from '~/components/Group.vue'
import Meta from '~/assets/mixins/meta'
import uuid from 'uuid'

export default {
    mixins: [Meta],
    fetch ({store}) {
        store.commit('resetModal')
        store.commit('resetModalProfile')
    },
    components: {
        Login,
        Talk,
        Group
    },
    data() {
        return {
            loading: true,
            isActiveTab: 'talk',
            displayName: '',
            title: '',
            description: '',
            inputTitle: '',
            inputDescription: '',
            inputSubArea: '',
            selectedSubArea: '全域',
            pickedArea: '全域',
            inputTitleForGroup: '',
            inputDescriptionForGroup: '',
            selectedSubAreaForGroup: '',
            pickedAreaForGroup: '全域',
            selectedSubAreaForGroup: '全域',
            selectedType: '派遣会社',
            groupImage: '',
            status: '',
            areaId: '',
            areaName: '',
            prefName: '',
            prefNameForGroup: '',
            talks: [],
            talkId: '',
            groups: [],
            isOpenModal: false,
            isOpenModalForGroup: false,
            users: '',
            usersNum: 0,
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
            subAreaData: [],
            subAreaDataForGroup: [],
            subAreas: [],
            subAreasForGroup: [],
            targetArea: '全域',
            targetAreaForGroup: '全域',
            meta: {
                title: '地域ごとの会議室一覧',
                description: '地域ごとの会議室一覧です。',
                type: 'article',
                url: 'https://hakentalk.com/area/' + this.$route.params.id
            }
        }
    },
    computed: {
        ...mapState(['area']),
        ...mapGetters(['isArea']),
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    mounted() {
        this.getTalks()
        this.getSubArea()
        this.getGroups()
        // this.setCurrentFilter()
        this.setTimeoutLoading()
    },
    created() {
        this.setArea({
            areaId: this.$route.params.id,
            areaName: this.areaData[this.$route.params.id-1]
        })
        this.prefName = this.areaData[this.$route.params.id-1]
        this.prefNameForGroup = this.areaData[this.$route.params.id-1]
    },
    methods: {
        ...mapActions(['setArea']),
        uploadFile(e) {
            const file = (e.target.files || e.dataTransfer.files)[0]
            if (file) {
                const fileName = uuid()
                console.log('fileName '+ fileName)

                var storageRef = firebase.storage().ref()
                var uploadRef = storageRef.child('images/' + fileName)
                uploadRef.put(file)
                    .then(snapshot => {
                        console.log('Uploaded a blob or file!')
                        uploadRef.getDownloadURL()
                            .then(url => {
                                document.getElementById('imageSample').style.backgroundImage = 'url('+ url +')'
                                this.groupImage = url.replace('images%2F', 'images%2Fthumb_')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
            }
        },
        getTalks() {
            let now = new Date()
            // let limit = new Date(now.setDate(now.getDate() - 7))
            // const talksRef = firebase.firestore().collection('talks').where('area', '==', this.$route.params.id).where('createdAt', '>', limit).orderBy('createdAt', 'desc')
            const talksRef = firebase.firestore().collection('talks').where('area', '==', this.$route.params.id).orderBy('createdAt', 'desc')
            talksRef.onSnapshot(snapshot => {
                this.talks = [];
                snapshot.forEach(doc => {
                    this.talks.push({
                        id: doc.id,
                        displayName: doc.data().displayName,
                        photoURL: doc.data().photoURL,
                        title: doc.data().title,
                        description: doc.data().description,
                        users: doc.data().users,
                        createdAt: doc.data().createdAt,
                        subArea: doc.data().subArea
                    })
                    if ( doc.data().subArea != '全域' ) {
                        this.subAreas.push(doc.data().subArea)
                        this.subAreas = this.subAreas.filter(function (x, i, self) {
                            return self.indexOf(x) === i;
                        })
                    }
                })
                this.loading = false
            })
        },
        createTalk() {
            if(this.inputTitle) {
                firebase.firestore().collection('talks').add({
                    authorId: this.$store.state.user.uid,
                    displayName: this.$store.state.user.displayName,
                    photoURL: this.$store.state.user.photoURL,
                    title: this.inputTitle,
                    description: this.inputDescription,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    area: this.$route.params.id,
                    subArea: this.selectedSubArea
                })
                .then(result => {
                    firebase.firestore().collection('talks').doc(result.id).update({
                        users: firebase.firestore.FieldValue.arrayUnion({
                            uid: this.$store.state.user.uid,
                            photoURL: this.$store.state.user.photoURL
                        })
                    })
                    this.toggleModal()
                }).catch(err => {
                    console.log(err)
                })
            } else {
                alert('タイトルを入力してください。')
            }
        },
        createGroup() {
            if(this.$store.state.status === 'login') { 
                if(this.inputTitleForGroup) {
                    firebase.firestore().collection('groups').add({
                        type: this.selectedType,
                        authorId: this.$store.state.user.uid,
                        displayName: this.$store.state.user.displayName,
                        photoURL: this.$store.state.user.photoURL,
                        title: this.inputTitleForGroup,
                        description: this.inputDescriptionForGroup,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        area: this.$route.params.id,
                        subArea: this.selectedSubAreaForGroup,
                        groupImage: this.groupImage
                    })
                    .then(result => {
                        firebase.firestore().collection('groups').doc(result.id).collection('users').doc(this.$store.state.user.uid).set({
                            displayName: this.$store.state.user.displayName,
                            photoURL: this.$store.state.user.photoURL,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        this.toggleModalForGroup()
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    alert('グループ名を入力してください。')
                }
            } 
        },
        getSubArea() {
            return axios.get('/json/m_' + this.$route.params.id + '.json')
            .then(res => {
                this.subAreaData = res.data
                this.subAreaDataForGroup = res.data
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
        checkTargetArea(area) {
            if ( this.pickedArea == '全域' ) {
                return false
            } else if ( this.pickedArea == area ){
                return false
            } else {
                return true
            }
        },
        checkTargetAreaForGroup(area) {
            if ( this.pickedAreaForGroup == '全域' ) {
                return false
            } else if ( this.pickedAreaForGroup == area ){
                return false
            } else {
                return true
            }
        },
        checkFilter(area, event) {
            this.pickedArea = area
            let e = document.getElementsByClassName('filter__item')
            for ( let i = 0; i < e.length; i++ ) {
                e[i].className = 'filter__item'
            }
            event.currentTarget.className = 'filter__item isActive'
        },
        checkFilterForGroup(area, event) {
            this.pickedAreaForGroup = area
            let e = document.getElementsByClassName('filter__item')
            for ( let i = 0; i < e.length; i++ ) {
                e[i].className = 'filter__item'
            }
            event.currentTarget.className = 'filter__item isActive'
        },
        setCurrentFilter(area) {
            if ( this.pickedArea == area ) {
                return true
            } else {
                return false
            }
        },
        setCurrentFilterForGroup(area) {
            if ( this.pickedAreaForGroup == area ) {
                return true
            } else {
                return false
            }
        },
        // checkFilter(area) {
        //     if ( this.pickedArea = area ) {
        //         return true
        //     } else {
        //         return false
        //     }
        // },
        setTargetAreaForGroup(area, event) {
            this.targetAreaForGroup = area
            let e = document.getElementsByClassName('filter__itemForGroup')
            for ( let i = 0; i < e.length; i++ ) {
                e[i].className = 'filter__itemForGroup'
            }
            event.currentTarget.className = 'filter__itemForGroup isActive'
        },
        isTargetAreaForGroup(area) {
            if ( this.targetAreaForGroup == '全域' ) {
                return false
            } else if ( this.targetAreaForGroup == area ){
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
        },
        toggleModalForGroup() {
            this.isOpenModalForGroup = !this.isOpenModalForGroup
        },
        setRadioArea() {

        },
        getGroups() {
            const groupsRef = firebase.firestore().collection('groups').where('area', '==', this.$route.params.id).orderBy('createdAt', 'desc')
            groupsRef.onSnapshot(snapshot => {
                this.groups = [];
                snapshot.forEach(doc => {
                    if (doc.exists) {
                        let usersNum = 0
                        if (typeof doc.data().users !== 'undefined' && typeof doc.data().users === 'object' && Object.keys(doc.data().users).length) {
                            usersNum = Object.keys(doc.data().users).length
                        } else {
                            usersNum = 1
                        }
                        this.groups.push({
                            id: doc.id,
                            type: doc.data().type,
                            groupImage: doc.data().groupImage,
                            displayName: doc.data().displayName,
                            photoURL: doc.data().photoURL,
                            title: doc.data().title,
                            description: doc.data().description,
                            users: doc.data().users,
                            createdAt: doc.data().createdAt,
                            area: doc.data().area,
                            subArea: doc.data().subArea,
                            users: doc.data().users
                        })
                        if ( doc.data().subArea != '全域' ) {
                            this.subAreasForGroup.push(doc.data().subArea)
                            this.subAreasForGroup = this.subAreasForGroup.filter(function (x, i, self) {
                                return self.indexOf(x) === i;
                            })
                        }
                    }
                })
            })
            // this.setSubArea();
        },
        setTimeoutLoading() {
            if (this.loading = true) {
                setTimeout(function() {
                    this.loading = false
                }, 5000)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.imageSampleWrapper {
    margin-top: 1rem;
    #imageSample {
        display: block;
        width: 200px;
        height: 200px;
        background-color: #c0c0c0;
        background-size: cover;
    }
}
.ttl {
    background-color: #fff;
    z-index: 11;
}

.containerWrapper {
    background-color: #fff;
    padding: 1rem 0;
    .container {
        margin: 1rem auto 0;
    }
}

.tabContentsWrapper {
    background-color: #f6f8fa;
    overflow: hidden;
}

.form {
    overflow-y: scroll;
}

.talk,
.group {
    &.invisible {
        display: none;
    }
}

.filter {
    &__item {
            border: none;
            padding: 0;
        input {
            display: none;
        }
        label {
            background-color: #fff;
            border: 2px solid #eee;
            border-radius: .25rem;
            padding: .5rem 1rem;
            cursor: pointer;
            transition: all .2s;
        }
        &.isActive {
            label {
                border: 2px solid #222;
            }
        }
    }
    @media screen and ( max-width: 601px ) {
        overflow-x: scroll;
        flex-wrap: nowrap;
        height: 2.5rem;
        align-items: center;
        &__item {
            flex: 0 0 auto;
        }
    }
}

.addButton {
    cursor: pointer;
    width: 8rem;
    text-align: right;
    overflow: hidden;
}

.left-enter-active, .left-leave-active {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform .2s cubic-bezier(0, 0, 0.2, 1) 0ms, opacity .2s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.left-leave-active {
    // position: absolute;
}

.left-enter, .left-leave-to {
  transform: translateX(-10vw) translateX(0px);
  opacity: 0;
}

.right-enter-active, .right-leave-active {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform .2s cubic-bezier(0, 0, 0.2, 1) 0ms, opacity .2s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.right-leave-active {
    // position: absolute;
}

.right-enter, .right-leave-to {
  transform: translateX(10vw) translateX(0px);
  opacity: 0;
}

.left-little-enter-active, .left-little-leave-active {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform .2s cubic-bezier(0, 0, 0.2, 1) 0ms, opacity .2s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.left-little-leave-active {
    position: absolute;
}

.left-little-enter, .left-little-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.right-little-enter-active, .right-little-leave-active {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform .2s cubic-bezier(0, 0, 0.2, 1) 0ms, opacity .2s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.right-little-leave-active {
    position: absolute;
}

.right-little-enter, .right-little-leave-to {
  transform: translateX(10px);
  opacity: 0;
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