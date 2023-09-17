const gulp = require('gulp');
const pug = require('gulp-pug');
const tailwindcss = require('tailwindcss');
const postcss = require('gulp-postcss');
const ts = require('gulp-typescript');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const tsProject = ts.createProject('tsconfig.json');

// copying files
gulp.task('copy', () => {
   gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// pug => Html
gulp.task('pug', () =>  gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
);

// tailwindcss => css
gulp.task('styles', () => gulp.src('src/**/*.css')
    .pipe(postcss([tailwindcss]))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
);

// TypeScript => JavaScript
gulp.task('typescript', () =>  tsProject.src()
    .pipe(tsProject())
        .on("error", () =>{
      /* Ignore compiler errors */
    }).js.pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
  );

// Compress and compile Ts files
gulp.task('scripts', () => gulp.src('dist/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
);


// مهمة لإنشاء خادم HTTPS
gulp.task('https-server', () => connect.server({
    host: 'localhost',
    root: 'dist',
    livereload: true,
    https: true,
    port: 3000,
  })
);

gulp.task('watch', () => {
  gulp.watch('src/*.html', gulp.series('copy'));
  gulp.watch('src/*.pug', gulp.series('pug'));
  gulp.watch('src/styles/*.css', gulp.series('styles'));
  gulp.watch('src/scripts/*.ts', gulp.series('typescript'));
  gulp.watch('src/scripts/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('copy', 'pug', 'styles', 'typescript', 'scripts', 'watch'));
gulp.task('serve', gulp.parallel('copy', 'https-server', 'typescript','pug', 'styles', 'scripts', 'watch'));

