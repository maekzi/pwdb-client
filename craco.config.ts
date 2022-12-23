// eslint-disable-next-line import/no-anonymous-default-export
export default {
  eslint: {
    plugins: ['formatjs'],
    rules: {
      'formatjs/no-offset': 'error'
    }
  },
  babel: {
    plugins: [
      ['@babel/plugin-syntax-dynamic-import'],
      [
        'formatjs',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          ast: true
        }
      ]
    ]
  }
};
