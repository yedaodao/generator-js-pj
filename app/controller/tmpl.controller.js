module.exports = function (app, answers) {
    if (answers.readme) {
        app.fs.copyTpl(
            app.templatePath('Readme.md.ejs'),
            app.destinationPath(answers.name + '/Readme.md'),
            answers
        );
    }
    if (answers.packageJson) {
        app.fs.copyTpl(
            app.templatePath('package.json.ejs'),
            app.destinationPath(answers.name + '/package.json'),
            answers
        );
    }
    return Promise.resolve({});
};
