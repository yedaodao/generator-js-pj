var Promise = require('bluebird');

module.exports = function (app, answer) {
    var pjPath = app.config.get('pjPath');
    return new Promise(function (resolve, reject) {
        var desRoot = app.destinationRoot();
        app.spawnCommandSync('git', ['init'], {
            cwd: pjPath
        });
        app.spawnCommandSync('git', ['remote', 'add', 'origin', answer.repository], {
            cwd: pjPath
        });
        app.spawnCommandSync('git', ['config', 'user.name', answer.gitName], {
            cwd: pjPath
        });
        app.spawnCommandSync('git', ['config', 'user.email', answer.email], {
            cwd: pjPath
        });
        resolve(pjPath);
    });
};
