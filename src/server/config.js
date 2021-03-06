var config = {
  port: parseInt(process.env.PORT, 10) || 8080,

  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/stereocause-dev'
  },

  stripe: {
    secretKey: process.env.STRIPE_KEY || 'sk_test_dgmAUS9q2DOnAYe5ZYWYueUG'
  },

  mandrill: {
    key: process.env.MANDRILL_KEY || 'QQJ-Rj8ilCQZa2HAygVuEg'
  },

  file: 'storage/stereoCause.zip',

  env: process.env.NODE_ENV,

  isTest: process.env.NODE_ENV === 'test'
};

export default config;