<template>
    <div class="header">
        <div class="header__inner">
            <div class="header__back">
                <!-- <nuxt-link to="`/area/+${store.state.area.areaId}`">←</nuxt-link> -->
                
                <!-- {{ $store.state.area.areaName }} -->
            </div>
            <div class="header__logo">
                <nuxt-link to="/">派遣会議</nuxt-link>
            </div>
            <!-- <div class="header__nav">
                    <ul>
                    <li><nuxt-link to="/area"><img src="/img/localisation.png" width="20" alt="">会議を探す</nuxt-link></li>
                    <li><nuxt-link to="/talks"><img src="/img/chat.png" width="20" alt="">会議を開く</nuxt-link></li>
                    </ul>
            </div> -->
            <div>
                    <profile />
            </div>
        </div>
        <transition-group>
        <div class="modal modal--full" v-if="isOpenModal" key="div" @click.self="isOpenModal=!isOpenModal">
            <div class="modal__inner">
                <h3 class="center">会議室を作成</h3>
                <div class="form">
                    <div class="formGroup">
                        <label for="title">タイトル</label>
                        <input type="text" id="title" name="title" v-model="inputTitle" placeholder="ex. 〇〇の現場ってどう？ □□周辺のおすすめの現場は？">
                    </div>
                    <div class="formGroup">
                        <label for="description">説明文</label>
                        <textarea name="description" id="description" cols="30" rows="10" v-model="inputDescription"></textarea>
                    </div>
                    <!-- <div class="formGroup">
                        <label for="subArea">地域</label>
                        <select v-model="selectedSubArea" name="" id="subArea">
                            <option value="全域">{{ $store.state.area.areaName }}全域</option>
                        <option v-for="(data, index) in subAreaData" :key="index">{{ data.municipality_name }}</option>
                        </select>
                    </div> -->
                </div>
                <div class="formGroup formGroup--buttons center">
                    <button @click="isOpenModal=!isOpenModal" class="button button--round">キャンセル</button>
                    <button @click="createTalk" class="button button--yellow button--round">会議を開く</button>
                </div>
            </div>
        </div>
        </transition-group>
    </div>
</template>

<script>
import Profile from '~/components/Profile.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Profile
    },
    data() {
        return {
            isOpenModal: false,

        }
    },
    computed: {
        ...mapState[('area')],
        ...mapGetters[('area')]
    },
    methods: {
        ...mapActions(['setArea']),
        toggleModal() {
            this.isOpenModal = !this.isOpenModal
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    li {
        img {
            width: 20px;
            height: 20px;
            margin-right: .25rem;
            vertical-align: sub;
            object-fit: contain;
        }
    }
    @media screen and ( max-width: 500px ) {
        li {
            text-align: center;
            img {
                display: block;
                margin: 0 auto;
            }
        }
    }
}
</style>
