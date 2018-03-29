// copy the all file in path
// link 
// http://lib.csdn.net/article/30/53742?knId=788
// http://www.cnblogs.com/gaojun/p/4159488.html
// http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html 使用指南
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var rimraf = require('rimraf');

function copyPath(src, dist) {
    reSetPath(dist, function(mark) {
        fs.mkdir(dist, function() { //创建目录
            console.log('mark ...', mark);
            copy(src, dist);
        })
    });
}

function reSetPath(pathReset, callBack) {
    // 1. delete dist 
    fs.exists(path.resolve(pathReset), function(exists) {
        if (exists) {
            console.log(' exists');
            // delete 
            rimraf(pathReset, function(err) { // detele file or folder
                callBack(err ? false : true);
            });
        } else {
            console.log('not exists');
            callBack(true);
        }
    });
}

function copy(src, dst) {
    //读取目录
    fs.readdir(src, function(err, paths) {
        console.log(paths)
        if (err) {
            throw err;
        }
        paths.forEach(function(path) {
            var _src = src + '/' + path;
            var _dst = dst + '/' + path;
            var readable;
            var writable;
            fs.stat(_src, function(err, st) {
                if (err) {
                    throw err;
                }

                if (st.isFile()) {
                    readable = fs.createReadStream(_src); //创建读取流
                    writable = fs.createWriteStream(_dst); //创建写入流
                    readable.pipe(writable);
                } else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
}

function exists(src, dst, callback) {
    //测试某个路径下文件是否存在
    fs.exists(dst, function(exists) {
        if (exists) { //不存在
            callback(src, dst);
        } else { //存在
            fs.mkdir(dst, function() { //创建目录
                callback(src, dst)
            })
        }
    })
}

copyPath('./source_or', './source');