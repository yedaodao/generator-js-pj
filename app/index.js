var generators = require('yeoman-generator');

var mkdirController = require('./controller/mkdir.controller'),
    gitInitController = require('./controller/gitInit.controller'),
    ignoreController = require('./controller/ignore.controller'),
    tmplController = require('./controller/tmpl.controller');

module.exports = generators.Base.extend({
    prompting: function () {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: 'my-project'
            },
            {
                type: 'input',
                name: 'repository',
                message: 'git repository'
            },
            {
                type: 'input',
                name: 'gitName',
                message: 'git name',
                default: this.user.git.name()
            },
            {
                type: 'input',
                name: 'email',
                message: 'email',
                default: this.user.git.email()
            },
            {
                type: 'input',
                name: 'license',
                message: 'license',
                default: 'MIT'
            },
            {
                type: 'list',
                name: 'os',
                message: 'Your platform',
                choices: [
                    'OSX',
                    'Linux',
                    'Windows'
                ]
            },
            {
                type: 'checkbox',
                name: 'ide',
                message: 'Your IDE',
                choices: [
                    'WebStorm',
                    'SublimeText',
                    'PhpStorm',
                    'VisualStudio'
                ]
            },
            {
                type: 'confirm',
                name: 'readme',
                message: 'Generate Readme.md',
                default: false
            },
            {
                type: 'confirm',
                name: 'packageJson',
                message: 'Generate package.json',
                default: false
            }
        ])
            .then(function (answers) {
                this.config.set('answers', answers);
            }.bind(this));
    },
    writing: function () {
        var self = this,
            answers = this.config.get('answers');
        mkdirController(self, answers.name)
            .then(function (pjPath) {
                self.config.set('pjPath', pjPath);
                return gitInitController(self, answers);
            })
            .then(function () {
                return tmplController(self, answers);
            })
            .then(function () {
                return ignoreController(self, answers);
            })
            .catch(function (err) {
                self.log(err);
            });
    }
});
