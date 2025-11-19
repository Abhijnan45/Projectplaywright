const Excel = require('exceljs');

async function excel (){
const WorkBook = new Excel.Workbook();
const filepath = path.join(__dirname, 'download.xlsx');
await WorkBook.xlsx.readFile(filepath);
const WorkSheet = WorkBook.getWorksheet('Sheet1');

WorkSheet.eachRow((row,rowNumber) =>
{

    row.eachCell((cell,colNumber) =>
    {
        //console.log(cell.value);
        if(cell.value==='Banana')
        {
            console.log(rowNumber,colNumber);
        }
    })
})
}
excel();