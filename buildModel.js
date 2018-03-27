var xlsx = require('node-xlsx');
var fs = require('fs');

var data = [{
        name: 'sheet1',
        data: [
            [
                'ID',
                'Name',
                'Score'
            ],
            [
                '1',
                'Michael',
                '99'

            ],
            [
                '2',
                'Jordan',
                '98'
            ]
        ]
    },
    {
        name: 'sheet2',
        data: [
            [
                'AA',
                'BB'
            ],
            [
                '23',
                '24'
            ]
        ]
    }
]

//write
var buffer = xlsx.build(data);
fs.writeFile('./result.xls',buffer,function(error){
	if(error){
		throw error;
	}
})

// read xls
var obj = xlsx.parse('./'+"result.xls");
console.log('read ...',obj);
console.log('data ...',JSON.stringify(obj));