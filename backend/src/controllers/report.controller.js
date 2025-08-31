import path from 'path';
import { fileURLToPath } from 'url';
import { buildPDF } from '../utils/pdf.js';
import { buildExcel } from '../utils/excel.js';
import Exam from '../models/exam.model.js';
import Vaccination from '../models/vaccination.model.js';
import Incident from '../models/incident.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const summaryReport = async (req, res) => {
  const from = new Date(req.query.from || Date.now()-7*86400000);
  const to = new Date(req.query.to || Date.now());
  const consults = await Exam.countDocuments({ createdAt: { $gte: from, $lte: to } });
  const vaxPending = await Vaccination.countDocuments({ status: { $in: ['pending','overdue'] } });
  const pdfPath = path.join(__dirname, `../uploads/summary-${Date.now()}.pdf`);
  await buildPDF({ title: 'Health Summary', officer: req.user.name, lines: [`Consultations: ${consults}`, `Vaccination pending: ${vaxPending}`] }, pdfPath);
  res.download(pdfPath);
};

export const incidentReport = async (req, res) => {
  const rows = (await Incident.find().limit(200)).map(i => ({ caseId: i.caseId, status: i.status, severity: i.severity, createdAt: i.createdAt }));
  const columns = [{ header: 'Case ID', key: 'caseId' }, { header: 'Status', key: 'status' }, { header: 'Severity', key: 'severity' }, { header: 'Created', key: 'createdAt' }];
  const file = path.join(__dirname, `../uploads/incidents-${Date.now()}.xlsx`);
  await buildExcel(rows, columns, file);
  res.download(file);
};
