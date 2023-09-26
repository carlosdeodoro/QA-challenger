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
    "user_email": "email", ///Informe o email de login
    "user_password": "senha" /// Informe a senha
  },
});
