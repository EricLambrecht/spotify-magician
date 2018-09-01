module.exports = {

  types: [
    {value: 'fix',      name: 'fix:      A bug fix'},
    {value: 'feat',     name: 'feat:     A new feature'},
    {value: 'docs',     name: 'docs:     Documentation only changes'},
    {value: 'style',    name: 'style:    Markup, white-space, formatting, missing semi-colons...'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: 'perf',     name: 'perf:     A code change that improves performance'},
    {value: 'test',     name: 'test:     Adding missing tests'},
    {value: 'chore',    name: 'chore:    Build process or auxiliary tool changes'},
    {value: 'ci',       name: 'ci:       CI related changes'}
  ],

  scopes: [
    {name: 'editor'},
    {name: 'api'},
    {name: 'ui/ux'},
    {name: 'other'},
  ],

  scopeOverrides: {
    docs: [
      {name: 'readme'},
      {name: 'changelog'},
    ],
    chore: [],
  },

  // override the messages, defaults are as follows
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],

  // limit subject length
  subjectLimit: 100

};