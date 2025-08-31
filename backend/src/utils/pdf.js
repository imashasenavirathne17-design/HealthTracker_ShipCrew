import PDFDocument from 'pdfkit';
import fs from 'fs';
export const buildPDF = (data, filepath) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 36 });
    doc.pipe(fs.createWriteStream(filepath));
    doc.fontSize(18).text(data.title || 'Report', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Officer: ${data.officer || '-'}`);
    doc.text(`Generated: ${new Date().toISOString()}`);
    doc.moveDown();
    data.lines?.forEach(l => doc.text(`• ${l}`));
    doc.end();
    resolve(filepath);
  });
};
