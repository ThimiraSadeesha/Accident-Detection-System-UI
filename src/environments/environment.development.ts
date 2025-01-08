export const environment = {
    production: false,
    API_BASE: 'http://localhost:3000',


    cache: {
      maxSize: 5000,

      /**
       * Max Age
       *
       * @type string
       * @default 1h
       * @description TTL of the cache. Use the below format
       * 1d2h3m4s5u
       * - d - Days
       * - h - hours
       * - m - minutes
       * - s - seconds
       * - u - milliseconds
       */
      maxAge: '1d'
    },
  }




