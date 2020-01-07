const gulpfile = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// Compile Sass & Inject Browser
gulpfile.task('sass', function () {
    return gulpfile.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulpfile.dest('src/css'))
        .pipe(browserSync.stream());
});


// Move JS files to src/js
gulpfile.task('js', function () {
    return gulpfile.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulpfile.dest('src/js'))
        .pipe(browserSync.stream());
});

// Watch Sass & Server
gulpfile.task('serve', ['sass'], function () {
    browserSync.init({
       server: './src'
    });

    gulpfile.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulpfile.watch('src/*.html').on('change', browserSync.reload);
});

// Move Fonts Folder to src
gulpfile.task('fonts', function () {
    return gulpfile.src('node_modules/font-awesome/fonts/*')
        .pipe(gulpfile.dest('src/fonts'));
});

// Move Font Awesome CSS to src/css
gulpfile.task('fa', function () {
    return gulpfile.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulpfile.dest('src/css'));
});

gulpfile.task('default', ['js', 'serve', 'fa', 'fonts']);
