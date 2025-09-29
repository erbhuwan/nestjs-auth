module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation
        'style', // formatting, missing semicolons, etc
        'refactor', // code change that isn’t bug or feature
        'perf', // performance improvements
        'test', // adding/modifying tests
        'chore', // maintenance
        'revert', // reverting changes
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'], // enforce lower-case scopes
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'], // subject must not be empty
    'subject-full-stop': [2, 'never', '.'], // no trailing '.'
    'header-max-length': [2, 'always', 72], // keep subject line short
  },
};
