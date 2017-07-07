var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    cleancss = require('gulp-cleancss'),
    clean = require('gulp-clean'),
    header = require('gulp-header'),
    argv = require('yargs').argv;

var banner = '/* Version: <%= version %> | Licensed under MIT (https://github.com/galentian/bootstrap-extstyle/blob/master/LICENSE) | Packaged at <%= date %> */\n',
    date = new Date(),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bannerJson = {
        date: date.getHours() + ':' + date.getMinutes() + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
        version: argv.v ? argv.v : '0.1.0'
    };

var mainFile = './themes/bootstrap/build.less',

    projectName = 'bootstrap-extstyle',

    distFolder = './dist/',

    lessExt = '.less',
    cssExt = '.css',
    minCssExt = '.min.css',

    allFiles = '*.*';

var tasks = ['clean', 'css', 'css1', 'css2', 'css3', 'copyFonts'];

gulp.task(tasks[0], function () {
    return gulp.src(distFolder, { read: false }).pipe(clean());
});

gulp.task(tasks[1], [tasks[0]], function () {

    return gulp.src(mainFile)
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename(projectName + cssExt))
        .pipe(gulp.dest(distFolder + 'bootstrap/css/'))
        .pipe(rename(projectName + minCssExt))
        .pipe(cleancss())
        //.pipe(header(banner, bannerJson))
        .pipe(gulp.dest(distFolder + 'bootstrap/css/'));
});

gulp.task(tasks[2], [tasks[0]], function () {

    return gulp.src('./themes/blue/build.less')
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename(projectName + cssExt))
        .pipe(gulp.dest(distFolder + 'blue/css/'))
        .pipe(rename(projectName + minCssExt))
        .pipe(cleancss())
        //.pipe(header(banner, bannerJson))
        .pipe(gulp.dest(distFolder + 'blue/css/'));
});

gulp.task(tasks[3], [tasks[0]], function () {

    return gulp.src('./themes/blue-glass/build.less')
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename(projectName + cssExt))
        .pipe(gulp.dest(distFolder + 'blue-glass/css/'))
        .pipe(rename(projectName + minCssExt))
        .pipe(cleancss())
        //.pipe(header(banner, bannerJson))
        .pipe(gulp.dest(distFolder + 'blue-glass/css/'));
});

gulp.task(tasks[4], [tasks[0]], function () {

    return gulp.src('./themes/dark/build.less')
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename(projectName + cssExt))
        .pipe(gulp.dest(distFolder + 'dark/css/'))
        .pipe(rename(projectName + minCssExt))
        .pipe(cleancss())
        //.pipe(header(banner, bannerJson))
        .pipe(gulp.dest(distFolder + 'dark/css/'));
});

gulp.task(tasks[5], [tasks[1], tasks[2], tasks[3], tasks[4]], function () {

  return gulp.src('./fonts/*')
    .pipe(gulp.dest(distFolder + 'blue/fonts'))
    .pipe(gulp.dest(distFolder + 'blue-glass/fonts'))
    .pipe(gulp.dest(distFolder + 'dark/fonts'))
    .pipe(gulp.dest(distFolder + 'bootstrap/fonts'));
});

gulp.task('default', tasks, function () {
    return gulp;
});
