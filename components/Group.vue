<template lang="pug">
    div(:class="{ 'group group--full group--nohover': isGroupsId }")
        div.backLink(v-if="isGroupsId")
            nuxt-link(:to="{ name: 'area-id', params: { id: group.area }}") ←
        nuxt-link.group__link(v-if="isGroups || isIndex" :to="{name: 'groups-id', params: {id: group.id}}")
        div.group__userPhoto(v-if="group.groupImage")
            img(:src="group.groupImage" alt="photo | 派遣会議" width="150")
        div.group__userPhoto(v-else)
            img(src="/img/icon.svg" alt="icon | 派遣会議" width="150")
        div.group__meta
            //- div.group__userName(v-if="group.displayName") {{ group.displayName }} 
            //-     span.message_userId(v-if="isGroupsId" v-html="formatUserId(group.authorId)")
            //- div.group__userName(v-else) ゲスト 
            //-     span.message_userId(v-if="isGroupsId" v-html="formatUserId(group.authorId)")
            //- div.group__createdAt
            //-     span(v-html="formatDateFull(group.createdAt.toDate())")
            div.group__type
                span.type(v-html="group.type")
            div.group__area(v-if="isGroupsId" v-html="checkSubArea(group.subArea)")
            div.group__area(v-if="isGroups" v-html="checkSubAreaForArchive(group.subArea)")
            div.group__area(v-if="isIndex" v-html="printAreaName(group.area, group.subArea)")
        div.group__body
            h2.group__ttl {{ group.title }}
            //- p.group__description {{ group.description }}
        div.group__users
            div.group__usersPhoto
                div(v-for="(user, index) in group.users" :key="index")
                    img(v-if="user.photoURL" :src="user.photoURL" alt="photo | 派遣会議" width="30")
                    img(v-else src="/img/avatar.svg" alt="avatar | 派遣会議" width="30")
            div.group__usersNum(v-html="printUsersNum(group.users)")
</template>

<script>

export default {
    props: ['group', 'groupId'],
    data() {
        return {
            status: '',
            isGroupsId: false,
            isGroups: false,
            isIndex: false,
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
        }
    },
    computed: {
    },
    created() {
        if (this.$route.name == 'groups-id') {
            this.isGroupsId = true
        } else if (this.$route.name == 'groups' || this.$route.name == 'area-id') {
            this.isGroups = true
        } else if (this.$route.path == '/') {
            this.isIndex = true
        }
    },
    methods: {
        printUsersNum(users) {
            if (typeof users !== 'undefined' && typeof users === 'object' && Object.keys(users).length) {
                return Object.keys(users).length+'名が参加'
            } else {
                return 1+'名が参加'
            }
        },
        formatUserId(id) {
            let str = new String(id)
            return '[' + str.substr(0, 6) + ']'
        },
        formatDateFull(time) {
            let date = new Date(time);
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hour = ('0' + date.getHours()).slice(-2);
            let min = ('0' + date.getMinutes()).slice(-2);
            return mon + '/' + day + ' ' + hour + ':' + min;
        },
        checkSubArea(area) {
            if ( area == '全域' ) {
                return this.areaData[parseInt(this.group.area)-1] + ' 全域'
            } else {
                return this.areaData[parseInt(this.group.area)-1] + ' ' + area
            }
        },
        checkSubAreaForArchive(area) {
            if ( area == '全域' ) {
                return this.$store.state.area.areaName + ' 全域'
            } else {
                return this.$store.state.area.areaName + ' ' + area
            }
        },
        printAreaName(area, sub) {
            if ( sub == '全域' ) {
                return this.areaData[area-1] + ' 全域'
            } else {
                return this.areaData[area-1] + ' ' + sub
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.group {
    &__userPhoto {
        margin: 0 1rem 0 0;
        img {
            width: 150px;
            height: 150px;
            border-radius: .5rem;
            object-fit: cover;
        }
    }
    &__meta {
        flex-direction: row;
        align-items: center;
        margin: 0;
    }
    &__type {
        position: inherit;
        margin-left: 0;
    }
    &__area {
        margin: 0;
    }
    &__ttl {
        height: 4rem;
    }
    &__userName,
    &__createdAt {
        display: none;
    }
    &__users {
        border-top: none;
        padding-top: 0;
    }
}
</style>