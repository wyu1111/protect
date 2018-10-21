const gulp=require("gulp");
const connect=require("gulp-connect");
const sass=require("gulp-sass-china");
const proxy=require("gulp-connect-proxy");
gulp.task("connect",()=>{
    connect.server({
        //是否开启自动刷新功能
        livereload:true,
        root:"dist/"

    });
})
gulp.task("jquery",()=>{
    return gulp.src("js/*js")
    .pipe(gulp.dest("dist/jquery"));
})
gulp.task("img",()=>{
    return gulp.src(["img/*"])
    .pipe(gulp.dest("dist/img"));
})
gulp.task("php",()=>{
    return gulp.src(["php/*"])
    .pipe(gulp.dest("dist/php"));
})
gulp.task("sass",()=>{
    return gulp.src(["sass/*scss"])
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
})
gulp.task("iconfont",()=>{
    return gulp.src("icon/*")
    .pipe(gulp.dest("dist/conf"))
})
gulp.task("json",()=>{
    return gulp.src("*.json")
    .pipe(gulp.dest("dist/jso"))
})
gulp.task("html",()=>{
    return gulp.src(["index.html"])
    .pipe(gulp.dest("dist"))
    //书记更新之后，进行页面刷新
    .pipe(connect.reload());
})

gulp.task("html2",()=>{
    return gulp.src(["index2.html"])
    .pipe(gulp.dest("dist"))
    //书记更新之后，进行页面刷新
    .pipe(connect.reload());
})
gulp.task("html3",()=>{
    return gulp.src(["index3.html"])
    .pipe(gulp.dest("dist"))
    //书记更新之后，进行页面刷新
    .pipe(connect.reload());
})
gulp.task("html4",()=>{
    return gulp.src(["index4.html"])
    .pipe(gulp.dest("dist"))
    //书记更新之后，进行页面刷新
    .pipe(connect.reload());
})
gulp.task("html5",()=>{
    return gulp.src(["index5.html"])
    .pipe(gulp.dest("dist"))
    //书记更新之后，进行页面刷新
    .pipe(connect.reload());
})
gulp.task("html6",()=>{
    return gulp.src(["index6.html"])
    .pipe(gulp.dest("dist"))
    //书记更新之后，进行页面刷新
    .pipe(connect.reload());
})

gulp.task("watch",()=>{
    gulp.watch("index.html",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("index2.html",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("index3.html",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("index4.html",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("index5.html",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("index6.html",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("sass/*css",["html","sass","jquery","html2","html3","html4","html5","html6"]);
    gulp.watch("jquery/*js",["html","sass","jquery","html2","html3","html4","html5","html6"])
})
gulp.task("default",["watch","connect","sass","jquery","img","iconfont","json","php"]);