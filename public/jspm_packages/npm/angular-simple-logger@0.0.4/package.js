/* */ 
(function(process) {
  var packageName = 'nmccready:angular-simple-logger';
  var where = 'client';
  var version = Npm.require(process.env.PWD + '/package.json').version;
  console.log("angular-simple-logger version to publish: " + version);
  Package.describe({
    name: packageName,
    version: version,
    summary: 'angular-simple-logger (official)',
    git: 'git@github.com:nmccready/angular-simple-logger.git',
    documentation: null
  });
  Package.onUse(function(api) {
    api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
    api.use(['angular:angular@1.2.0'], where);
    api.addFiles('dist/angular-simple-logger.js', where);
  });
})(require('process'));
