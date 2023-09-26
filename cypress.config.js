const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://app.simplesdental.com/simples/login',
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 850,
    video: false,
    defaultCommandTimeout: 15000,
  },
  env: {
    "user_email": "carlajoana231@gmail.com",
    "user_password": "carlajoana123"
  },
});
