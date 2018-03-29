// copy the all file in path
// link 
// http://lib.csdn.net/article/30/53742?knId=788
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var rimraf = require('rimraf');

function copyPath(src, dist) {
    reSetPath(dist, function(mark) {
        console.log('mark ...', mark)
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
            console.log(true);
        }
    });
}

copyPath('./source_or', './source');