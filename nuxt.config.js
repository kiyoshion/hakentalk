const pkg = require('./package')


export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    title: '派遣会議',
    titleTemplate: '%s | 派遣会議',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '派遣会議は、派遣アルバイトについて語り合う、匿名チャットサービスです。' },
      { hid: 'og:site_name', property: 'og:site_name', content: '派遣会議' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://hakentalk.com' },
      { hid: 'og:title', property: 'og:title', content: '派遣会議' },
      { hid: 'og:description', property: 'og:description', content: '派遣会議は、派遣アルバイトについて語り合う、匿名チャットサービスです。' },
      { hid: 'og:image', property: 'og:image', content: 'https://hakentalk.com/img/ogp/common.jpg' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', type: 'text/css', href: 'https://www.gstatic.com/firebasejs/ui/4.3.0/firebase-ui-auth.css' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.1.0/firebase-storage.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.1.0/firebase-messaging.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.1.0/firebase-analytics.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.1.0/firebase-firestore.js' },
      // { src: 'https://www.gstatic.com/firebasejs/ui/4.3.0/firebase-ui-auth.js' }
    ]
  },
  generate: {
    fallback: true,
    routes: [
      '/area/1',
      '/area/2',
      '/area/3',
      '/area/4',
      '/area/5',
      '/area/6',
      '/area/7',
      '/area/8',
      '/area/9',
      '/area/10',
      '/area/11',
      '/area/12',
      '/area/13',
      '/area/14',
      '/area/15',
      '/area/16',
      '/area/17',
      '/area/18',
      '/area/19',
      '/area/20',
      '/area/21',
      '/area/22',
      '/area/23',
      '/area/24',
      '/area/25',
      '/area/26',
      '/area/27',
      '/area/28',
      '/area/29',
      '/area/30',
      '/area/31',
      '/area/32',
      '/area/33',
      '/area/34',
      '/area/35',
      '/area/36',
      '/area/37',
      '/area/38',
      '/area/39',
      '/area/40',
      '/area/41',
      '/area/42',
      '/area/43',
      '/area/44',
      '/area/45',
      '/area/46',
      '/area/47'
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase',
    { src: '~/plugins/localStorage.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],
  
  router: {
    middleware: ['authenticated']
  },

  manifest: {
    short_name: '派遣会議',
    name: "派遣会議",
    lang: 'ja'
  },

  workbox: {
    dev: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
