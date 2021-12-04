<template lang="pug">
    div.container
        div.flex.flex--center
            h1.ttl コミュニティ
            div(v-if="isLogin && !$store.state.user.isAnonymous")
                button.button.button--yellow.button--round(@click="toggleModal") コミュニティを作る
        div.filter.flex.flex--wrap
            div.filter__item.isActive(@click="setTargetArea('全域', $event)") {{ prefName }}全域
            div.filter__item(v-for="(data, index) in subAreas" :key="index" @click="setTargetArea(data, $event)") {{ data }}
        div.flex.flex--space-between.flex--wrap
            div.talk.visible(v-for="(group, index) in groups" :key="index" :class="{invisible: isTargetArea(group.subArea)}")
                group(:group="group")

        transtion-group
            div.modal.modal--full(v-if="isOpenModal" key="div" @click.self="isOpenModal=!isOpenModal")
                div.modal__inner
                    h3.center コミュニティを作成
                    div.form
                        div.formGroup
                            label(for="title") コミュニティ名
                                span.red *
                            input#title(type="text" name="title" v-model="inputTitle" placeholder="ex. 派遣会社名や職場名")
                        div.formGroup
                            label(for="type") 種別
                            select#type(v-model="selectedType" name="type")
                                option(value="派遣会社") 派遣会社
                                option(value="職場") 職場
                        div.formGroup
                            label(for="description") 説明文
                            textarea#description(name="description" cols="30" rows="5" v-model="inputDescription")
                        div.formGroup
                            label(for="area") 都道府県
                                span.red *
                            select#area(v-model="selectedArea" name="area" @change="setSubArea")
                                option(value="都道府県を選択") 都道府県を選択
                                option(v-for="(data, index) in areaData" :key="index" :value="index+1") {{ data }}
                        div.formGroup
                            label(for="subArea") 市区町村
                                span.red *
                            select#subArea(v-model="selectedSubArea" name="subArea")
                                option(value="全域") {{ areaData[selectedArea-1] }}全域
                                option(v-for="(data, index) in subAreaData" :key="index") {{ data.m_name }}
                    div.formGroup.formGroup--buttons.center
                        button.button.button--round(@click="isOpenModal=!isOpenModal") キャンセル
                        button.button.button--yellow.button--round(@click="createGroup") コミュニティを作る
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Profile from '~/components/Profile.vue'
import Group from '~/components/Group.vue'
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
            inputTitle: '',
            inputTitleKana: '',
            inputDescription: '',
            term: true,
            isOpenModal: false,
            selectedType: '派遣会社',
            selectedArea: '都道府県を選択',
            selectedSubArea: '全域',
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
            subAreaData: [],
            subAreas: [],
            groups: [],
            targetArea: '',
            meta: {
                title: 'コミュニティ一覧',
                description: 'コミュニティでは、最後の一言だけ残ります。',
                type: 'article',
                url: 'https://hakentalk.com/groups'
            }
        }
    },
    components: {
        Profile,
        Group
    },
    computed: {
        ...mapState(['area']),
        ...mapGetters(['isArea']),
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    mounted() {
        this.getGroups()
    },
    methods: {
        ...mapActions(['setUser']),
        ...mapMutations(['setUser']),
        setSubArea: function () {
            return axios.get('/json/m_' + this.selectedArea + '.json')
            .then(res => {
                this.subAreaData = res.data
            })
        },
        createGroup() {
            if(this.$store.state.status === 'login') { 
                if(this.inputTitle && this.selectedArea != '都道府県を選択' && this.selectedSubArea != '') {
                    firebase.firestore().collection('groups').add({
                        type: this.selectedType,
                        authorId: this.$store.state.user.uid,
                        displayName: this.$store.state.user.displayName,
                        photoURL: this.$store.state.user.photoURL,
                        title: this.inputTitle,
                        description: this.inputDescription,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        area: String(this.selectedArea),
                        subArea: this.selectedSubArea
                    })
                    .then(result => {
                        firebase.firestore().collection('groups').doc(result.id).update({
                            users: firebase.firestore.FieldValue.arrayUnion({
                                uid: this.$store.state.user.uid,
                                photoURL: this.$store.state.user.photoURL
                            })
                        })
                        this.$router.push({ path: `/groups/${result.id}` });
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    alert('タイトル、地域を入力してください。')
                }
            } else { // for new Anonymous
                if(this.term) {
                    if(this.inputTitle && this.selectedArea != '都道府県を選択' && this.selectedSubArea != '') {
                        firebase.auth().signInAnonymously()
                        .then(result => {
                            firebase.firestore().collection('groups').add({
                                authorId: result.user.uid,
                                displayName: 'ゲスト',
                                photoURL: '/img/avatar.svg',
                                title: this.inputTitle,
                                description: this.inputDescription,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                area: String(this.selectedArea),
                                subArea: this.selectedSubArea
                            }).then(result => {
                                firebase.firestore().collection('groups').doc(result.id).update({
                                    users: firebase.firestore.FieldValue.arrayUnion({
                                        uid: this.$store.state.user.uid,
                                        photoURL: '/img/avatar.svg'
                                    })
                                })
                                this.$router.push({ path: `/area/${this.selectedArea}` });
                            }).catch(err => {
                                console.log(err)
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    } else {
                        alert('タイトル、地域を入力してください。')
                    }
                } else {
                    alert('利用規約に同意する必要があります。')
                }
                
            }
        },
        getGroups() {
            const groupsRef = firebase.firestore().collection('groups').orderBy('createdAt', 'desc')
            groupsRef.onSnapshot(snapshot => {
                this.groups = [];
                snapshot.forEach(doc => {
                    
                    let usersNum = 0
                    if (typeof doc.data().users !== 'undefined' && typeof doc.data().users === 'object' && Object.keys(doc.data().users).length) {
                        usersNum = Object.keys(doc.data().users).length
                    } else {
                        usersNum = 1
                    }
                    this.groups.push({
                        id: doc.id,
                        type: doc.data().type,
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
            })
            // this.setSubArea();
        },
        toggleModal() {
            this.isOpenModal = !this.isOpenModal
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
        }
    }
}
</script>