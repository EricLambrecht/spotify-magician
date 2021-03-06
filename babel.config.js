module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: [
            'last 6 chrome versions',
            'last 6 firefox versions',
            'last 3 safari versions',
            'last 3 edge versions',
          ],
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },
}
