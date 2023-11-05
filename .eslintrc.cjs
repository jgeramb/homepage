module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  overrides: [
    {
      files: ["*.config.js", ".eslintrc.cjs"],
      env: {
        node: true
      }
    }
  ],
  rules: {
    "vue/multi-word-component-names": "off"
  }
};
