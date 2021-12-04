<template>
    <div class="globalnav">
        <div class="globalnav__inner">
            <div class="globalnav__logo">
                <nuxt-link to="/">派遣会議</nuxt-link>
            </div>
            <div class="globalnav__nav">
                <ul>
                    <li><nuxt-link to="/talks"><img src="/img/chat.png" width="20" alt=""></nuxt-link></li>
                    <li><nuxt-link to="/area"><img src="/img/location.png" width="20" alt=""></nuxt-link></li>
                    <li><nuxt-link to="/company"><img src="/img/company.png" width="20" alt=""></nuxt-link></li>
                    <li><nuxt-link to="/company"><img src="/img/event.png" width="20" alt=""></nuxt-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from '~/components/Profile.vue'

export default {
    components: {
        Profile
    }
}
</script>
