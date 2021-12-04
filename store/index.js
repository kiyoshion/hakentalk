import firebase from '@/plugins/firebase.js'

export const strict = false

export const state = () => ({
    status: '', 
    user: null,
    area: null,
    isModalActive: false,
    isModalProfileActive: false,
})

export const mutations = {
    setUser(state, payload) {
        state.status = 'login'
        state.user = payload
    },
    setArea(state, payload) {
        state.area = payload
    },
    toggleModal(state) {
        state.isModalActive = !state.isModalActive
    },
    toggleModalProfile(state) {
        state.isModalProfileActive = !state.isModalProfileActive
    },
    resetModal(state) {
        state.isModalActive = false
    },
    resetModalProfile(state) {
        state.isModalProfileActive = false
    },
    logout(state) {
        state.status = 'logout'
        state.user = null
    },
    logoutForAnonymous(state) {
        state.status = 'logout'
        state.user = null
    }
}

export const actions = {
    setUser({ commit }, payload) {
        commit('setUser', payload)
    },
    setArea({ commit }, payload) {
        commit('setArea', payload)
    },
    setStocks({ commit }, payload) {
        commit('setStocks', payload)
    },
    logout({ commit }) {
        firebase.auth().signOut().then(() => {
            commit('logout')
        })
    },
    logoutForAnonymous({ commit }) {
        var user = firebase.auth().currentUser;
        firebase.auth().signOut().then(() => {
            commit('logout')
            user.delete().then(function () {

            }).catch(function (error) {
                console.log(error)
            })
        })
    }
}

export const getters = {
    isAuthenticated(state) {
        return !!state.user
    },
    isLogin: state => state.status === "login",
    isArea(state) {
        return state.area
    },
    isStocks(state) {
        return state.stocks
    },
    user: state => {
        return state.user
    }
}