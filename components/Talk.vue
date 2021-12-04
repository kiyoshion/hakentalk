<template lang="pug">
    div(:class="{ 'talk talk--full talk--nohover': isTalksId }")
        div.backLink(v-if="isTalksId")
            nuxt-link(:to="{ name: 'area-id', params: { id: talk.area }}") ←
        nuxt-link.talk__link(v-if="isAreaId || isIndex" :to="{name: 'talks-id', params: {id: talk.id}}")
        div.talk__userPhoto(v-if="talk.photoURL")
            img(:src="talk.photoURL" alt="photo | hakentalk" width="50")
        div.talk__userPhoto(v-else)
            img(src="/img/avatar.svg" alt="avatar | hakentalk" width="50")
        div.talk__meta
            div.talk__userName(v-if="talk.displayName") {{ talk.displayName }} 
                span.message_userId(v-if="isTalksId" v-html="formatUserId(talk.authorId)")
            div.talk__userName(v-else) ゲスト 
                span.message_userId(v-if="isTalksId" v-html="formatUserId(talk.authorId)")
            div.talk__createdAt
                span(v-html="formatDateFull(talk.createdAt)")
            //- div.talk__area(v-if="isTalksId" v-html="checkSubArea(talk.subArea)")
            div.talk__status
                span(:class="status" v-html="checkTalkStatus(talk.createdAt)")
        div.talk__body
            div.talk__area(v-if="isAreaId" v-html="checkSubAreaForArchive(talk.subArea)")
            div.talk__area(v-if="isIndex || isTalksId " v-html="printAreaName(talk.area, talk.subArea)")
            h2.talk__ttl {{ talk.title }}
            p.talk__description {{ talk.description }}
        div.talk__users
            div.talk__usersPhoto
                div(v-for="(user, index) in talk.users" :key="index")
                    img(v-if="user.photoURL" :src="user.photoURL" alt="photo | hakentalk" width="30")
                    img(v-else src="/img/avatar.svg" alt="avatar | hakentalk" width="30")
            div.talk__usersNum(v-html="printUsersNum(talk.users)")
</template>

<script>

export default {
    props: ['talk', 'talkId'],
    data() {
        return {
            status: '',
            isTalksId: false,
            isAreaId: false,
            isIndex: false,
            areaData: [ '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県' ],
        }
    },
    computed: {
    },
    created() {
        if (this.$route.name == 'talks-id') {
            this.isTalksId = true
        } else if (this.$route.name == 'area-id') {
            this.isAreaId = true
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
            var timeToDate = ''
            try {
                timeToDate = time.toDate()
            }
            catch(e) {
                console.log(e)
            }
            let date = new Date(timeToDate);
            let mon = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hour = ('0' + date.getHours()).slice(-2);
            let min = ('0' + date.getMinutes()).slice(-2);
            return mon + '/' + day + ' ' + hour + ':' + min;
        },
        checkSubArea(area) {
            if ( area == '全域' ) {
                let result = this.areaData[parseInt(this.talk.area)-1]
                return result
            } else {
                return area
            }
        },
        checkSubAreaForArchive(area) {
            if ( area == '全域' ) {
                return this.$store.state.area.areaName + ' 全域'
            } else {
                return this.$store.state.area.areaName + ' ' + area
            }
        },
        checkTalkStatus(time) {
            var timeToDate = ''
            try {
                timeToDate = time.toDate()
            }
            catch(e) {
                console.log(e)
            }
            let date = new Date(timeToDate)
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