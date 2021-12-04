<template lang="pug">
    div
        //-<!-- <table class="table">
            <tbody>
                <tr>
                    <th>北海道・東北</th>
                    <td>nuxt-link(to="/area/1">北海道</nuxt-link></td>
                    <td>nuxt-link(to="/area/2">青森県</nuxt-link></td>
                    <td>nuxt-link(to="/area/3">岩手県</nuxt-link></td>
                    <td>nuxt-link(to="/area/4">宮城県</nuxt-link></td>
                    <td>nuxt-link(to="/area/5">秋田県</nuxt-link></td>
                    <td>nuxt-link(to="/area/6">山形県</nuxt-link></td>
                    <td>nuxt-link(to="/area/7">福島県</nuxt-link></td>
                </tr>
                <tr>
                    <th>関東</th>
                    <td>nuxt-link(to="/area/8">茨城県</nuxt-link></td>
                    <td>nuxt-link(to="/area/9">栃木県</nuxt-link></td>
                    <td>nuxt-link(to="/area/10">群馬県</nuxt-link></td>
                    <td>nuxt-link(to="/area/11">埼玉県</nuxt-link></td>
                    <td>nuxt-link(to="/area/12">千葉県</nuxt-link></td>
                    <td>nuxt-link(to="/area/13">東京都</nuxt-link></td>
                    <td>nuxt-link(to="/area/14">神奈川県</nuxt-link></td>
                </tr>
                <tr>
                    <th>甲信越・北陸</th>
                    <td>nuxt-link(to="/area/15">新潟県</nuxt-link></td>
                    <td>nuxt-link(to="/area/16">富山県</nuxt-link></td>
                    <td>nuxt-link(to="/area/17">石川県</nuxt-link></td>
                    <td>nuxt-link(to="/area/18">福井県</nuxt-link></td>
                    <td>nuxt-link(to="/area/19">山梨県</nuxt-link></td>
                    <td>nuxt-link(to="/area/20">長野県</nuxt-link></td>
                </tr>
                <tr>
                    <th>東海</th>
                    <td>nuxt-link(to="/area/21">岐阜県</nuxt-link></td>
                    <td>nuxt-link(to="/area/22">静岡県</nuxt-link></td>
                    <td>nuxt-link(to="/area/23">愛知県</nuxt-link></td>
                    <td>nuxt-link(to="/area/24">三重県</nuxt-link></td>
                </tr>
                <tr>
                    <th>関西</th>
                    <td>nuxt-link(to="/area/25">滋賀県</nuxt-link></td>
                    <td>nuxt-link(to="/area/26">京都府</nuxt-link></td>
                    <td>nuxt-link(to="/area/27">大阪府</nuxt-link></td>
                    <td>nuxt-link(to="/area/28">兵庫県</nuxt-link></td>
                    <td>nuxt-link(to="/area/29">奈良県</nuxt-link></td>
                    <td>nuxt-link(to="/area/30">和歌山県</nuxt-link></td>
                </tr>
                <tr>
                    <th>中国・四国</th>
                    <td>nuxt-link(to="/area/31">鳥取県</nuxt-link></td>
                    <td>nuxt-link(to="/area/32">島根県</nuxt-link></td>
                    <td>nuxt-link(to="/area/33">岡山県</nuxt-link></td>
                    <td>nuxt-link(to="/area/34">広島県</nuxt-link></td>
                    <td>nuxt-link(to="/area/35">山口県</nuxt-link></td>
                    <td>nuxt-link(to="/area/36">徳島県</nuxt-link></td>
                    <td>nuxt-link(to="/area/37">香川県</nuxt-link></td>
                    <td>nuxt-link(to="/area/38">愛媛県</nuxt-link></td>
                    <td>nuxt-link(to="/area/39">高知県</nuxt-link></td>
                </tr>
                <tr>
                    <th>九州・沖縄</th>
                    <td>nuxt-link(to="/area/40">福岡県</nuxt-link></td>
                    <td>nuxt-link(to="/area/41">佐賀県</nuxt-link></td>
                    <td>nuxt-link(to="/area/42">長崎県</nuxt-link></td>
                    <td>nuxt-link(to="/area/43">熊本県</nuxt-link></td>
                    <td>nuxt-link(to="/area/44">大分県</nuxt-link></td>
                    <td>nuxt-link(to="/area/45">宮崎県</nuxt-link></td>
                    <td>nuxt-link(to="/area/46">鹿児島県</nuxt-link></td>
                    <td>nuxt-link(to="/area/47">沖縄県</nuxt-link></td>
                </tr>
            </tbody>
        //-</table> -->

        div.area.flex.flex--column
            h3 北海道・東北
            ul
                li
                    nuxt-link(to="/area/1") 北海道
                li
                    nuxt-link(to="/area/2") 青森県
                li
                    nuxt-link(to="/area/3") 岩手県
                li
                    nuxt-link(to="/area/4") 宮城県
                li
                    nuxt-link(to="/area/5") 秋田県
                li
                    nuxt-link(to="/area/6") 山形県
                li
                    nuxt-link(to="/area/7") 福島県
        div.area.flex.flex--column
            h3 関東
            ul
                li
                    nuxt-link(to="/area/8") 茨城県
                li
                    nuxt-link(to="/area/9") 栃木県
                li
                    nuxt-link(to="/area/10") 群馬県
                li
                    nuxt-link(to="/area/11") 埼玉県
                li
                    nuxt-link(to="/area/12") 千葉県
                li
                    nuxt-link(to="/area/13") 東京都
                li
                    nuxt-link(to="/area/14") 神奈川県
        div.area.flex.flex--column
            h3 甲信越・北陸
            ul
                li
                    nuxt-link(to="/area/15") 新潟県
                li
                    nuxt-link(to="/area/16") 富山県
                li
                    nuxt-link(to="/area/17") 石川県
                li
                    nuxt-link(to="/area/18") 福井県
                li
                    nuxt-link(to="/area/19") 山梨県
                li
                    nuxt-link(to="/area/20") 長野県
        div.area.flex.flex--column
            h3 東海
            ul
                li
                    nuxt-link(to="/area/21") 岐阜県
                li
                    nuxt-link(to="/area/22") 静岡県
                li
                    nuxt-link(to="/area/23") 愛知県
                li
                    nuxt-link(to="/area/24") 三重県
        div.area.flex.flex--column
            h3 関西
            ul
                li
                    nuxt-link(to="/area/25") 滋賀県
                li
                    nuxt-link(to="/area/26") 京都府
                li
                    nuxt-link(to="/area/27") 大阪府
                li
                    nuxt-link(to="/area/28") 兵庫県
                li
                    nuxt-link(to="/area/29") 奈良県
                li
                    nuxt-link(to="/area/30") 和歌山県
        div.area.flex.flex--column
            h3 中国・四国
            ul
                li
                    nuxt-link(to="/area/31") 鳥取県
                li
                    nuxt-link(to="/area/32") 島根県
                li
                    nuxt-link(to="/area/33") 岡山県
                li
                    nuxt-link(to="/area/34") 広島県
                li
                    nuxt-link(to="/area/35") 山口県
                li
                    nuxt-link(to="/area/36") 徳島県
                li
                    nuxt-link(to="/area/37") 香川県
                li
                    nuxt-link(to="/area/38") 愛媛県
                li
                    nuxt-link(to="/area/39") 高知県
        div.area.flex.flex--column
            h3 九州・沖縄
            ul
                li
                    nuxt-link(to="/area/40") 福岡県
                li
                    nuxt-link(to="/area/41") 佐賀県
                li
                    nuxt-link(to="/area/42") 長崎県
                li
                    nuxt-link(to="/area/43") 熊本県
                li
                    nuxt-link(to="/area/44") 大分県
                li
                    nuxt-link(to="/area/45") 宮崎県
                li
                    nuxt-link(to="/area/46") 鹿児島県
                li
                    nuxt-link(to="/area/47") 沖縄県
</template>

<script>
export default {
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.area {
    h3 {
        margin: 1rem 0 0;
    }
    ul {
        display: flex;
        padding: 0;
        list-style: none;
        li {
            margin-right: .5rem;
            &:last-child {
                margin-right: 0;
            }
            a {
                display: inline-block;
                background-color: #fff;
                border: 2px solid #eee;
                border-radius: .25rem;
                font-size: .8rem;
                font-weight: 700;
                padding: .5rem 1rem;
                transition: all .2s;
                &:hover {
                    border: 2px solid #1a73e8;
                }
            }
        }
        &.isActive {
            display: flex;
        }
    }
    @media screen and ( max-width: 769px ) {
        h3 {
            margin: .5rem 0 .25rem;
        }
        ul {
            flex-wrap: wrap;
            li {
                margin-bottom: .5rem;
                a {
                    font-size: .6rem;
                    font-weight: 500;
                }
            }
        }
    }
}

</style>