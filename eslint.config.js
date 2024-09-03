import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/*.md',
  ],
  rules: {
    'no-console': 'off',
  },
})
