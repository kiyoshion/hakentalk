<template lang="pug">
    div
        div.modalNav(:class="{ isActive: $store.state.isModalActive }")
            transition(tag="div")
                div.modalNav__inner(v-if="$store.state.isModalActive")
                    h3 MENU
                    edit-profile
                    div.modalNav__list
                        div.modalNav__item
                            nuxt-link(to="/area")
                                img(src="/img/icon-japan.svg" width="20" alt="area | 派遣会議")
                                span 会議を探す
                        div.modalNav__item
                            nuxt-link(to="/talks")
                                img(src="/img/icon-chat-border.svg" width="20" alt="chat | 派遣会議")
                                span 会議を開く
                        //- div.modalNav__item
                        //-     nuxt-link(to="/groups")
                        //-         img(src="/img/icon-chat-border.svg" width="20" alt="groups | 派遣会議")
                        //-         span グループを作る
        div.modalNav__button(@click="$store.commit('toggleModal')" :class="{ isActive: $store.state.isModalActive }")
            span
            span
</template>

<script>
import Profile from '~/components/Profile.vue'
import EditProfile from '~/components/EditProfile.vue'

export default {
    components: {
        Profile,
        EditProfile
    },
    data() {
        return {
            isModalActive: false
        }
    },
    methods: {
        toggleModal() {
            this.isModalActive = !this.isModalActive
        }
    }
}
</script>

<style lang="scss" scoped>
.modalNav {
    // display: none;
}
@media screen and ( max-width: 769px ) {
    .modalNav {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        color: #fff;
        // transform: translateX(100%);
        transition: all .2s;
        z-index: 100;
        &__button {
            position: absolute;
            top: 1.25rem;
            // top: -2rem;
            right: 1rem;
            width: 20px;
            height: 20px;
            z-index: 101;
            &:hover {
                cursor: pointer;
            }
            span {
                position: absolute;
                top: 0;
                left: 0;
                background-color: #222;
                width: 20px;
                height: 1px;
                transition: all .2s;
                &:nth-child(2) {
                    top: 10px;
                }
            }
            &.isActive {
                position: fixed;
                span {
                    top: 5px;
                    background-color: #fff;
                    transform: rotate(45deg);
                    &:nth-child(2) {
                        top: 5px;
                        transform: rotate(-45deg);
                    }
                }
            }
        }
        &.isActive {
            position: fixed;
            visibility: visible;
            // transform: translatex(0);
            z-index: 99;
            .modal__inner {
                position: absolute;
                top: 0;
                left: 0;
                padding: .5rem;
            }
        }
        &__inner {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #051e34;
            padding: 1rem;    
            overflow-y: scroll;
        }
        &__list {
            display: flex;
            justify-content: space-around;
            margin-top: 3rem;
            // transition: all .1s .1s;
        }
        &__item {
            // border: 2px solid #fff;
            background-color: #fff;
            border-radius: .5rem;
            text-align: center;
            width: 30%;
        }
        h3 {
            border-bottom: 1px solid #fff;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
        }
        ul {
            display: flex;
            list-style: none;
            padding-left: 0;
        }
        a {
            display: block;
            // color: #fff;
            padding: 2rem 1rem;
            font-size: .6rem;
        }
        img {
            // display: none;
            display: block; 
            margin: 0 auto .5rem;
            width: 30px;
            height: 30px;
            object-fit: contain;
        }
        @media screen and ( max-width: 500px ) {
            a {
                padding: 1rem;
            }
        }
    }
}


.v-enter-active,
.v-leave-active {
    transition: all .2s;
}
.v-enter,
.v-leave-to {
    // opacity: 0;
    transform: translateX(100%);
}

</style>
