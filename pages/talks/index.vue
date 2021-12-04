<template lang="pug">
    div.container
        h2 会議を開く
        div.form
            div.formGroup.formGroup--full
                label(for="title") タイトル
                    span.red *
                input#title(type="text" name="title" v-model="inputTitle" placeholder="ex. 〇〇周辺のおすすめの職場は？")
            div.formGroup.formGroup--full
                label(for="description") 説明文
                textarea#description(name="description" cols="30" rows="5" v-model="inputDescription")
            div.formGroup.formGroup--full
                label(for="area") 都道府県
                    span.red *
                select#area(v-model="selectedArea" name="area" @change="setSubArea")
                    option(value="都道府県を選択") 都道府県を選択
                    option(v-for="(data, index) in areaData" :key="index" :value="index+1") {{ data }}
            div.formGroup.formGroup--full
                label(for="subArea") 市区町村
                    span.red *
                select#subArea(v-model="selectedSubArea" name="subArea")
                    option(value="全域") {{ areaData[selectedArea-1] }}全域
                    option(v-for="(data, index) in subAreaData" :key="index") {{ data.m_name }}
            div.formGroup.formGroup--full.formGroup--flex(v-if="!isLogin")
                input#term(type="checkbox" v-model="term")
                label(for="term")
                    nuxt-link.link--underline(to="/term" target="_blank") 利用規約
                        | に同意する
        div.formGroup.formGroup--buttons.center
            button.button.button--yellow.button--round(@click="createTalk") 会議を開く
</template>

<script>
import firebase from '@/plugins/firebase.js'
import 'firebase/firestore'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
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
            inputTitle: '',
            inputDescription: '',
            talks: [],
            term: true,
            selectedArea: '都道府県を選択',
            selectedSubArea: '全域',
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
            subAreaData: [],
            meta: {
                title: '会議を開く',
                description: 'こちらから会議室を作成することができます。',
                type: 'article',
                url: 'https://hakentalk.com/talks'
            }
        }
    },
    components: {
        Profile
    },
    computed: {
        ...mapState(['area']),
        ...mapGetters(['isArea']),
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
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
        createTalk() {
            if(this.$store.state.status === 'login') { 
                if(this.inputTitle && this.selectedArea != '都道府県を選択' && this.selectedSubArea != '') {
                    firebase.firestore().collection('talks').add({
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
                        firebase.firestore().collection('talks').doc(result.id).update({
                            users: firebase.firestore.FieldValue.arrayUnion({
                                uid: this.$store.state.user.uid,
                                photoURL: this.$store.state.user.photoURL
                            })
                        })
                        this.$router.push({ path: `/area/${this.selectedArea}` });
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
                            firebase.firestore().collection('talks').add({
                                authorId: result.user.uid,
                                displayName: 'ゲスト',
                                photoURL: '/img/avatar.svg',
                                title: this.inputTitle,
                                description: this.inputDescription,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                area: String(this.selectedArea),
                                subArea: this.selectedSubArea
                            }).then(result => {
                                firebase.firestore().collection('talks').doc(result.id).update({
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
        }
    }
}
</script>