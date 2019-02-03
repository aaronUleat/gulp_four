function Gulp() {
    this.gulp               = require("gulp");
    // css
    this.sass               = require("gulp-sass");
    this.autoprefixer       = require("gulp-autoprefixer");
    this.rename             = require("gulp-rename");

    //js
    this.browserify         = require("gulp-browserify");
    this.uglify             = require("gulp-uglify");
    this.babel              = require("gulp-babel");
    this.concat             = require("gulp-concat");
    this.minify             = require("gulp-minify");

    this.dir = {
        src: {
          main: '/src',
          scss: './src/scss',
          js: './src/js'
        },
        dist: {
            css: './dist/css',
            js: `./dist/js`
        }
    };
}

Gulp.prototype.js = function(_src, _dist) {
    const self = this;
    return self.gulp
        .src(_src)
        .pipe(self.browserify())
        .pipe(self.babel({presets: ['@babel/env']}))
        .pipe(self.uglify())
        .pipe(self.gulp.dest(_dist))
};

Gulp.prototype.css = function(_src, _dist) {
    const self = this;
    return self.gulp
        .src(_src)
        .pipe( self.sass() )
        .pipe( self.autoprefixer())
        .pipe( self.gulp.dest(_dist) )
};

Gulp.prototype.js_lib = function (_src, _dist, _name) {
    const self = this;
    return self.gulp
        .src(_src)
        .pipe(self.concat(_name))
        .pipe( self.minify())
        .pipe(self.gulp.dest(_dist))
};

// Gulp.prototype.js = function(_dist, _src) {
//
// }

var g = new Gulp();
g.gulp.task("betslip", (done) => {
    g.js(`${g.dir.src.js}/main.js`, `${g.dir.dist.js}`);
    done();
});
g.gulp.task("sass_myb_cashier", (done) => {
    g.css(`${g.dir.src.scss}/styles.scss`, `${g.dir.dist.css}`);
    done();
});

g.gulp.task("libs", (done) => {
    g.js_lib([`${g.dir.src.js}/boundle/jquery.js`, `${g.dir.src.js}/boundle/bootstrap.js`, `${g.dir.src.js}/boundle/jquery_validation.js`, `${g.dir.src.js}/boundle/jquery_validate_additional_methods.js`],
        `${g.dir.dist.js}`,
        'libraries.js');
    done();
})