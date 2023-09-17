const { series, parallel, watch, dest, src  } = require('gulp');
const pug = require('gulp-pug');
const tailwindcss = require('tailwindcss');
const postcss = require('gulp-postcss');
const ts = require('gulp-typescript');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
 
const tsProject = ts.createProject('tsconfig.json');

// copying files
const copyHTML = () => src(['src/*.html', 'manifest.json'])
    .pipe(dest('dist'))
    .pipe(connect.reload());

const copyImages = () => src('src/images/*')
    .pipe(dest('dist/images'))
    .pipe(connect.reload());

const copyWebFonts = () => src('src/webfonts/*')
    .pipe(dest('dist/webfonts'))
    .pipe(connect.reload());



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

// HTTPS
const httpsServer = () => connect.server({
  host: 'localhost',
  root: 'dist',
  livereload: true,
  https: true,
  port: 3000,
});

const watcher = watch(['src/*.html', 'src/*.pug', 'css/*.css', 'scripts/*.ts'], {}, series(copyHTML, copyImages, copyWebFonts, pugCompile, styles, typescriptCompile, scriptsBun));
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

exports.serve = parallel(copyHTML, copyImages, copyWebFonts, httpsServer, pugCompile, styles, typescriptCompile, scriptsBun)
exports.default = series(copyHTML, copyImages, copyWebFonts, pugCompile, styles, typescriptCompile, scriptsBun)

