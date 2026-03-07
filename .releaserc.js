module.exports = {
  branches: ['master', 'main'],
  verifyConditions: ['@semantic-release/changelog', '@semantic-release/git', '@semantic-release/github'],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}'
    }
  ],
  publish: ['@semantic-release/github'],
  success: false,
  fail: false,
  plugins: [
    '@semantic-release/npm',
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits',
      releaseRules: [
        { type: 'fix', release: 'patch' },
        { type: 'feat', release: 'minor' },
        { breaking: true, release: 'major' },
        { type: '*', release: 'patch' }
      ]
    }], ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
      presetConfig: {
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'tech', section: 'Others', hidden: false }
        ]
      }
    }]
  ]
}
