// Import required packages
const gulp = require('gulp');
const exec = require('child_process').exec;

// Task to run the validation script
gulp.task('validate', (done) => {
    exec('node validate.js', (err, stdout, stderr) => {
        if (err) {
            console.error(stderr);
            done();
            return;
        }
        console.log(stdout);
        done();
    });
});

// Watch task to automatically run the validation script on changes
gulp.task('watch', () => {
    gulp.watch(['fighter.json', 'book.json'], gulp.series('validate'));
});

// Default task (runs when you type `gulp` in the terminal)
gulp.task('default', gulp.series('watch'));