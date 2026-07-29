import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-01',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Casino Finder Starter',
      meta: [
        {
          name: 'description',
          content: 'Casino finder starter project.',
        },
        {
          name: 'theme-color',
          content: '#0b0b0a',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: 'data:,',
        },
        {
          rel: 'preload',
          href: '/fonts/lato/lato-900.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:8080',
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
