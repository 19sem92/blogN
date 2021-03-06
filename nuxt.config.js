const pkg = require('./package');
const bodyParser = require('body-parser');
const axios = require('axios');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title:   'Hello!!', //pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'http://fonts.googleapis.com/css?family=Open+Sans'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  // loading: { color: 'yellow' },

  // loading: false,
    loading: { color: 'yellow', failedColor: 'green', height: '20px', duration: 5000},

  /*
  ** Global CSS
  */
  css: [
      '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~plugins/core-components.js',
      '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
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
  },

  env: {
    fbAPIKey: 'AIzaSyBdc1QbtP571s_Q4sjztNjDqO4iLXCR6rg'
  },

  transition: {
    name: 'page',
    mode: 'out-in'
  },

  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],

  generate: {
    routes: function () {
        return axios.get('https://blogn-1dade.firebaseio.com/posts.json')
            .then(res => {
              const routes = [];
                for (const key in res.data) {
                  routes.push('/posts/' + key)
                }
                return routes // all routs
                // return '/posts/-LGBNuzfoqcasTgze7Qn' // one rout
            })
    }
  }
}
