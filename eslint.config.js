// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@sujian/eslint-config')

module.exports = defineConfig({}, [
  {
    rules: {
      // import/order
      'import/order': 'off'
      // @typescript-eslint/ban-types
      // '@typescript-eslint/ban-types': 'off'
    }
  }
])
