var express = require('express');
var fs = require('fs');
var gulp = require('gulp');
var http = require('http');
var speccyLoader = require('speccy/lib/loader');
var speccyValidator = require('speccy/lib/validator');

var buildDir = './build';

const speccyOptions = {
    resolve: true,
    jsonSchema: true
};

gulp.task('default', [
    'watch',
    'serve'
]);

gulp.task('watch', () => {
    // Run once before watching to generate the OpenAPI JSON file, in case
    // it doesn't already exist.
    resolveOasAsJson();

    return gulp.watch('**/*.yaml', () => {
        resolveOasAsJson();
    });
});

gulp.task('serve', () => {
    var server = express();
    server.use('/', express.static(__dirname));
    server.listen(9000);
});

gulp.task('resolve', () => {
    resolveOasAsJson();
});

function resolveOasAsJson() {
    checkBuildDirectory();

    speccyLoader
        .loadSpec('openapi/openapi.yaml', speccyOptions)
        .then((spec) => {
            speccyValidator.validate(spec, {}, (error) => {
                console.log('');

                if (error) {
                    console.log(error);
                    console.log('');
                    console.log('[' + new Date().toISOString() + '] openapi.yaml is NOT valid!!!');

                    process.exit(error.code);
                } else {
                    console.log('[' + new Date().toISOString() + '] openapi.yaml validates!');

                    fs.writeFile('build/openapi.json', JSON.stringify(spec, null, 2), (error) => {
                        if (error) {
                            console.log(error);
                            console.log('');
                            console.log('[' + new Date().toISOString() + '] Could not write build/openapi.json!!!');

                            process.exit(error.code);
                        } else {
                            console.log('[' + new Date().toISOString() + '] Wrote build/openapi.json');
                        }
                    });
                }
            });
        });
}

function checkBuildDirectory() {
    if (!fs.existsSync(buildDir)){
        fs.mkdirSync(buildDir);
    }
}
