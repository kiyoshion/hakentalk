import firebase from '@/plugins/firebase.js'

export default function ({ store, route, redirect }) {
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user && !user.isAnonymous) {
    //         store.dispatch("setUser", user)
    //         if (route.path == '/login') {
    //             redirect('/')
    //         }
    //     }
    // })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // if (!user.isAnonymous) {
            store.dispatch("setUser", user)
            if (route.path == '/login') {
                redirect('/')
            } else if (route.name == 'talks-id') {
                return
            }
                
            // }
            // else {
            //     store.dispatch("setUser", {
            //         uid: store.state.user.uid,
            //         displayName: store.state.user.displayName,
            //         photoURL: '/img/avatar.svg',
            //         isAnonymous: true
            //     })
            //     if (route.path == '/login') {
            //         redirect('/')
            //     }
            // }
        }
        // else {
        //     if (user && !user.isAnonymous) {
        //         store.dispatch("setUser", user)
        //         if (route.path == '/login') {
        //             redirect('/')
        //         }
        //     } else if (user && user.isAnonymous) {
        //         store.dispatch("setUser", {
        //             uid: store.state.user.id,
        //             displayName: store.state.user.displayName,
        //             photoURL: '/img/avatar.svg',
        //             isAnonymous: true
        //         })
        //         if (route.path == '/login') {
        //             redirect('/')
        //         }
        //     }
        // }
    })
}