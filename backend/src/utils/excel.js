import ExcelJS from 'exceljs';
export const buildExcel = async (rows, columns, filepath) => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Report');
  ws.columns = columns;
  rows.forEach(r => ws.addRow(r));
  await wb.xlsx.writeFile(filepath);
  return filepath;
};
