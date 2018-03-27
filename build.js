var xlsx = require('xlsx');
var fs = require('fs');

// https://www.jianshu.com/p/82b26d188c23
// https://aotu.io/notes/2016/04/07/node-excel/index.html
// https://github.com/SheetJS/js-xlsx
// https://c7sky.com/parse-spreadsheet-with-js-xlsx-in-node-js.html


// base operation  =======  

// var path = './source_or/model/'+"37#.xls";
// var wb = xlsx.readFile(path);
// var sheetNames = wb.SheetNames; // get all sheetName (is Array)
// console.log('sheet ...',sheetNames);

// var wsheet = wb.Sheets[sheetNames[0]];  // get sheet object  not only name 
// console.log('sheet spec...',wsheet);

// var b2 = wsheet['B2'];  //get value of cell (B2)
// console.log('b2 ...',b2);
// console.log('b2 value ...',b2.v);

// var range = wsheet['!ref'];    // get range (rows and cols)   A1:I102
// console.log('range ...',range);

// var range_obj = wsheet['!range'];  // the ange object not value
// console.log('range_obj ...',range_obj);

// base operation  =======  

var path_target = './source_or/模版.xls';
var list_sheet_name = ['37#'];
var data_target = [];
var data_original = [];
// get  sheet_target all data
function getSheetTargetData(sheet_name) {
    var wb = xlsx.readFile(path_target);
    var listSheetNames = wb.SheetNames;
    console.log('all sheetName is ...', listSheetNames);
    // list_sheet_name.forEach(function(sheet_name) {
    // get sheet 
    var wsheet = wb.Sheets[sheet_name];
    // console.log('wsheet ...', wsheet);cls
    // get data   1.name 2.row and col
    var range_str = wsheet['!ref'];
    var cell_range = analysisCell(range_str);

    var col = 3; // row = 3
    for (var row = 0; row < cell_range.c; row++) {
        var xy = xlsx.utils.encode_cell({ r: row, c: col });
        // console.log('xy ...',xy);
        var cell = wsheet[xy];
        // console.log('cell row ...',cell)
        if (cell && cell.v) { // if have value than add to list
            var item_tar = { "val": cell.v, "row": row, "col": col };
            data_target.push(item_tar);
        }
    }
    var cell = wsheet['B2'];
    // cell.v = '测试项目';
    // cell.W = '测试项目';
    // delete cell.w;
    console.log('9999 ....',cell);

    // if(!wsheet.B2.c) wsheet.B2.c = [];
    // wsheet.B2.c.push({a:"SheetJS", t:"I'm a little comment, short and stout!"});
    // console.log('data_target ...', data_target)
    // });
}

// get origin data
function getSheetOriginData(sheet_name) {
    var path_original = './source_or/model/' + sheet_name + '.xls';
    var wb = xlsx.readFile(path_original);
    var listSheetNames = wb.SheetNames;
    // console.log('all sheetName is ...', listSheetNames);
    // list_sheet_name.forEach(function(sheet_name) {
    // get sheet 
    var wsheet = wb.Sheets[listSheetNames[0]]; // take the first only
    // console.log('wsheet ...', wsheet);
    // get data   1.name 2.row and col
    var range_str = wsheet['!ref'];
    var cell_range = analysisCell(range_str);
    console.log('cell_range ...', cell_range, range_str);

    var col = 2; // row = 3
    for (var row = 0; row < cell_range.r; row++) {
        var xy = xlsx.utils.encode_cell({ r: row, c: col });
        // console.log('xy ...',xy);
        var cell = wsheet[xy];
        // console.log('cell row ...',cell)
        if (cell && cell.v) { // if have value than add to list
            var item_tar = { "val": cell.v, "row": row, "col": col };
            // get val1 and val2
            var cell_1 = wsheet[xlsx.utils.encode_cell({ r: row, c: col + 3 })];
            var cell_2 = wsheet[xlsx.utils.encode_cell({ r: row, c: col + 5 })];
            // console.log(xlsx.utils.encode_cell({ r: row, c: col + 3 }));
            // console.log(xlsx.utils.encode_cell({ r: row, c: col + 5 }));

            // console.log('cell_1 ...',cell_1);
            item_tar['val1'] = cell_1.v;
            item_tar['val2'] = cell_2.v;
            data_original.push(item_tar);
        }
    }
    // console.log('data_original ...', data_original)
    // });

}

function analysisCell(ref) {
    var list = ref.split(':');
    // console.log('list ...', list);
    // list.forEach(function(item) {
    //     var cell = xlsx.utils.decode_cell(item);
    //     console.log('cell ...', cell);
    // })
    var cell = xlsx.utils.decode_cell(list[1]);
    return cell;
}

// use target data  find data (in model)  comparison
// get list for fill in target sheet
function comparisonData() {
    for (var i = 0; i < data_target.length; i++) {
        var target = data_target[i];
        for (var j = 0; j < data_original.length; j++) {
            var original = data_original[j];
            if (target.val == original.val) {
                target['val1'] = original['val1'];
                target['val2'] = original['val2'];
                // warning ... must fill color
                break;
            }
        }
    }
    // console.log('comparisonData ...', data_target)
}
//write data
function wirteData() {

}

// run all
function init() {
    list_sheet_name.forEach(function(sheet_name) {
        getSheetTargetData(sheet_name);
        getSheetOriginData(sheet_name);
        comparisonData();
    })
}


init();

// why not take effect ??
var wb = xlsx.readFile('./result.xls');
var listSheetNames = wb.SheetNames;
var wsheet = wb.Sheets[listSheetNames[0]];

if(!wsheet.A1.c) wsheet.A1.c = [];
wsheet.A1.c.push({a:"SheetJS", t:"I'm a little comment, short and stout!"});
console.log('all ... finished ...')


