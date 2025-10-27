// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: '2025-10-27',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },

  i18n: {
    locales: [
      { code: 'pt', file: 'pt.json' },
      { code: 'en', file: 'en.json' }
    ],
    langDir: 'locales/',
    defaultLocale: 'pt',
    strategy: 'prefix',
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
})