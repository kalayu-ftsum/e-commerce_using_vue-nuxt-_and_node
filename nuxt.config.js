import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      {src:'https://js.stripe.com/v3/',   async: true, defer: true}
    ],   
    link: [
      {rel:"stylesheet" ,href:'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {href:"https://use.fontawesome.com/releases/v5.0.13/css/all.css", rel:"stylesheet"},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
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
    '~/assets/style/app.styl',
    'vue-tel-input/dist/vue-tel-input.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */


  plugins: [
    '@/plugins/vuetify',
    { src: '~/plugins/socialsharing.js', ssr: false },
    { src: "@/plugins/product-zoomer.js", ssr: false },
    { src: '@/plugins/localStorage.js',  mode: 'client' },
    { src: '@/plugins/vee-validate.js' }
  ],

  /*
  ** Nuxt.js modules
  */
 modules: [
 ],

  /*
  ** Build configuration
  */
  build: {
  
    vendor: [
      "vue-product-zoomer",
      'vue-social-sharing',
      'vee-validate'
    ]
    
    ,
    transpile: ['vuetify/lib'],
   
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000'
  }
}
