var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    cleancss = require('gulp-cleancss'),
    clean = require('gulp-clean'),
    header = require('gulp-header'),
    argv = require('yargs').argv;

var banner = '/* Version: <%= version %> | Licensed under MIT (https://github.com/roctive/bootstrap-extstyle/blob/master/LICENSE) | Packaged at <%= date %> */\n',
    date = new Date(),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bannerJson = {
        date: date.getHours() + ':' + date.getMinutes() + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
        version: argv.v ? argv.v : '0.1.0'
    };

var mainFile = './less/bootstrap-extstyle.less',

    projectName = 'bootstrap-extstyle',

    distFolder = './dist/',
    
    lessExt = '.less',
    cssExt = '.css',
    minCssExt = '.min.css',
    
    allFiles = '*.*';

var tasks = ['clean', 'css'];

gulp.task(tasks[0], function () {
    return gulp.src(distFolder, { read: false }).pipe(clean());
});

gulp.task(tasks[1], [tasks[0]], function () {
    
    return gulp.src(mainFile)
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename(projectName + cssExt))
        .pipe(gulp.dest(distFolder))
        .pipe(rename(projectName + minCssExt))
        .pipe(cleancss())
        //.pipe(header(banner, bannerJson))
        .pipe(gulp.dest(distFolder));
});

gulp.task('default', tasks, function () {
    return gulp;
});