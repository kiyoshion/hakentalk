<template lang="pug">
    div.container
        h2 ご意見箱
        p 派遣会議では、ご要望・不具合報告・削除依頼等のご意見を受け付けています。
            br
            | ご意見については返信いたしかねますので、予めご了承ください。
        div.form
            div.formGroup.formGroup--full
                label(for='type') ご意見の種別
                    span.red *
                select#type(v-model='selectedType' name='type' @change='setType')
                    option(value="ご意見の種別を選択") ご意見の種別を選択
                    option(value="ご要望") ご要望
                    option(value="不具合報告") 不具合報告
                    option(value="削除依頼") 削除依頼
            div.formGroup.formGroup--full(v-if="selectedType=='削除依頼'")
                label(for='targetURL') 削除希望のURL
                    span.red *
                input#targetURL(type='text' name='targetURL' v-model='inputTargetURL')
            div.formGroup.formGroup--full
                label(for='body' v-html='printLabel()')
                    span.red *
                textarea#body(name="body" cols="30" rows="5" v-model="inputBody")
        div.formGroup.formGroup--buttons.center
            button.button.button--yellow.button--round(@click="createOpinion") 送信

        transition-group
            div.modal.modal--half(v-if="isModal" key="div" @click.self="isModal=!isModal")
                div.modal__inner.center
                    div.modal__icon
                        img(src="/img/icon-post.svg" width="100" alt="post | hakentalk")
                    h2 貴重なご意見、ありがとうございます。
                    p 内容を確認し、改善させていただきます。
                        br
                        | 今後とも派遣会議をよろしくお願いいたします。
                    div.modal__button
                        button.button.button--yellow.button--round(@click="isModal=false") 閉じる
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
            inputBody: '',
            inputTargetURL: '',
            selectedType: 'ご意見の種別を選択',
            isModal: false,
            meta: {
                title: 'ご意見箱',
                description: '派遣会議のご意見箱です。ご要望・不具合報告・削除依頼はこちらからお願いいたします。',
                type: 'article',
                url: 'https://hakentalk.com/opinion'
            }
        }
    },
    components: {
        Profile
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isAuthenticated']),
    },
    methods: {
        ...mapActions(['setUser']),
        createOpinion() {
            if(this.inputBody && this.selectedType != 'ご意見の種別を選択') {
                if (this.selectedType == '削除依頼') {
                    if (this.inputTargetURL) {
                        firebase.firestore().collection('opinions').add({
                            type: this.selectedType,
                            targetURL: this.inputTargetURL,
                            body: this.inputBody,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        }).then(result => {
                            this.inputBody = '',
                            this.selectedType = 'ご意見の種別を選択',
                            this.inputTargetURL = ''
                            this.isModal = true
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        alert('削除希望のURLを入力してください。')
                    }
                } else {
                    firebase.firestore().collection('opinions').add({
                        type: this.selectedType,
                        body: this.inputBody,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(result => {
                        this.inputBody = '',
                        this.selectedType = 'ご意見の種別を選択'
                        this.isModal = true
                    }).catch(err => {
                        console.log(err)
                    })
                }
            } else {
                alert('ご意見の種別、内容を入力してください。')
            }
        },
        printLabel() {
            if (this.selectedType == 'ご要望') {
                return 'ご要望の内容'
            } else if (this.selectedType == '不具合報告') {
                return '不具合の内容'
            } else if (this.selectedType == '削除依頼') {
                return '削除希望の理由'
            } else {
                return '内容'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 1rem;
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