// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // 서버 사이드에서만 접근 가능한 환경 변수
    secureKey: process.env.SECURE_KEY,

    // 클라이언트와 서버에서 모두 접근 가능한 환경 변수
    public: {
      apiUrl: process.env.API_URL
    }
  },
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: false
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/asset/base.css',
    '~/asset/main.css'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;700;900&family=Roboto:wght@100;300;400;500;900&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.quilljs.com/1.3.6/quill.core.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.quilljs.com/1.3.6/quill.snow.css'
        }
      ],
      script: [
        { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js' , type:'text/javascript'},
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.3.0/jquery.form.min.js' , type:'text/javascript'},
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' , type:'text/javascript'},
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/js/all.js' , type:'text/javascript'},
        { src: 'https://cdn.quilljs.com/1.3.6/quill.min.js' , type:'text/javascript'}
      ]
    }
  },
  plugins: [
    '~/plugins/connector.js'
  ]
})