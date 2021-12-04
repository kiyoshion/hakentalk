<template lang="pug">
    select#area(name="area" v-model="selectedArea")
        option(value="0") 都道府県
        option(v-for="(label, id) in areas" :key="id" :value="id") {{ label }}
</template>

<script>

export default {
    data() {
        return {
            selectedArea: 0,
            areas: {
                1: '北海道'
            }
        }
    },
    mounted() {
    }
}
</script>