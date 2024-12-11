const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: 'http://localhost:8000' // Cambia esto a la URL de tu backend
  }
};
