import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'hakentalk'
        })(store); // vuex plugins can be connected to store, even after creation
    });
};