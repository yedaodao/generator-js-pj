var mkdirp = require('mkdirp'),
    path = require('path'),
    Promise = require('bluebird');

module.exports = function (app, projectName) {
    var desRoot = app.destinationRoot(),
        pjPath = path.join(desRoot, projectName);
    return new Promise(function (resolve, reject) {
        mkdirp(pjPath, function (err) {
            if (err) {
                return reject(err);
            }
            resolve(pjPath);
        });
    });
};
