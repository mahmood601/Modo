const { series, parallel, watch, dest, src  } = require('gulp');
const pug = require('gulp-pug');
const tailwindcss = require('tailwindcss');
const postcss = require('gulp-postcss');
const ts = require('gulp-typescript');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
 
const tsProject = ts.createProject('tsconfig.json');

// copying files
const copy = () => src('src/*.html')
    .pipe(dest('dist'))
    .pipe(connect.reload());;

// pug => Html
const pugCompile = () => src('src/*.pug')
  .pipe(pug())
  .pipe(dest('dist'))
  .pipe(connect.reload());

// tailwindcss => css
const styles = () => src('src/**/*.css')
  .pipe(postcss([tailwindcss]))
  .pipe(dest('dist'))
  .pipe(connect.reload());

// TypeScript => JavaScript
const typescriptCompile = () => tsProject.src()
  .pipe(tsProject())
  .on("error", () => {
    /* Ignore compiler errors */
  }).js.pipe(dest("dist/js"))
  .pipe(connect.reload());

// Compress and compile Ts files
const scriptsBun = () => src('dist/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(connect.reload());

const webpTrans = () =>    gulp.src('src/**/*.{png,jpg,jpeg}')
        .pipe(webp())
        .pipe(gulp.dest('dist/images'));

// HTTPS
const httpsServer = () => connect.server({
  host: 'localhost',
  root: 'dist',
  livereload: true,
  https: true,
  port: 3000,
});

const watcher = watch(['src/*.html', 'src/*.pug', 'css/*.css', 'scripts/*.ts'], {}, series(copy, pugCompile, styles, typescriptCompile, scriptsBun));
watcher.on('change', function(path, stats) {
  console.log(`File ${path} was changed`);
});

watcher.on('add', function(path, stats) {
  console.log(`File ${path} was added`);
});

watcher.on('unlink', function(path, stats) {
  console.log(`File ${path} was removed`);
});

watcher.close();

exports.serve = parallel(copy, webpTrans, httpsServer, pugCompile, styles, typescriptCompile, scriptsBun)
exports.default = series(copy, webpTrans, pugCompile, styles, typescriptCompile, scriptsBun)

