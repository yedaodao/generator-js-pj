var Promise = require('bluebird'),
    request = require('request'),
    path = require('path'),
    fs = require('fs');

module.exports = function (app, answer) {
    var pjPath = app.config.get('pjPath');
    return new Promise(function (resolve, reject) {
        var baseUrl = 'https://www.gitignore.io/api/',
            qsVals = [answer.os].concat(answer.ide);
        app.log('it will request info from gitignore.io, please wait...');
        request(baseUrl + qsVals.join(','), function (err, res, body) {
            if (err) {
                return reject(err);
            }
            var desFile = path.join(pjPath, '.gitignore');
            app.write(desFile, body, function (err) {
                if (err) {
                    return reject(err)
                }
                resolve({});
            })
        });
    });
};
