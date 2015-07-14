Package.describe({
  name: 'devian:mailjet',
  version: '0.0.8',
  // Brief, one-line summary of the package.
  summary: 'Add contacts and subscribe to mailinglists on MailJet',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Dev1an/MailJet',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2')
  api.use('http')

  api.addFiles(['smtp.js', 'mailjet.js'], 'server')

  api.export("Mailjet")
})

Package.onTest(function(api) {
  api.use('tinytest')
  api.use('devian:mailjet')
  api.addFiles('mailjet-tests.js')
});
